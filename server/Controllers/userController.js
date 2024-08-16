const userDb = require("../Model/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const Rooms = require("../Model/roomModel");
const messageModel = require("../Model/messageModel");
const mongoose = require("mongoose");
// const maxAge = 1;
const maxAge = 3 * 24 * 60 * 60;


const createToken = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id }, process.env.JWT_SECRETE_KEY, { expiresIn: maxAge }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};



const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All Fields Are Required" });
        }

        const userExists = await userDb.findOne({ $or: [{ email }, { name }] });

        if (userExists) {
            const error = userExists.email === email ? "Email Already Exists" : "Name Already Exists, Please try another name";
            return res.status(400).json({ message:error });
        }

        const newUser = new userDb({ name, email, password });
        await newUser.save();

        const token = await createToken(newUser._id);
        res.status(200).json({ status: 1, message: "User Added Successfully", token, userId: newUser._id });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
    }
};



const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({ status: 0, error: "All Fields Are Required" })

        const userExist = await userDb.findOne({ email })
        if (userExist) {
            const passwordMatch = await bcrypt.compare(password, userExist.password)
            if (passwordMatch) {
                const token = await createToken(userExist._id)
                return res.status(200).json({ message: "Login Successfully", token, userId: userExist._id })
            } else {
                return res.status(400).json({ message: "Password Not Match" })
            }
        } else {
            return res.status(400).json({ message: "No user Found" })
        }

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
    }
}

const usersList = async (req, res, next) => {
    try {
        const users = await userDb.find({ _id: { $ne: req.user._id } }, { password: 0 });
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(400).json({ message: "NO users Found" })
        }
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" })
    }
}

const findRoomId = async (req, res, next) => {
    try {
        const users = req.body
        if (!req.body) {
            return res.status(400).json("Bad Request")
        }
        const room = await Rooms.findOne({ users: { $all: users } })
        if (!room) {
            const newRoom = new Rooms({
                users
            })

            const newRoomData = await newRoom.save();
            return res.status(200).json({ roomId: newRoomData._id });

        }
        return res.status(200).json({ roomId: room._id });

    } catch (error) {
        console.log(error.message);
    }
}


const messageList = async (req, res, next) => {
    try {
        const { roomId ,lastId,limit=10} = req.body;
        console.log(req.body,"boydy");

  
        if (roomId) {
            const matchConditions = { roomId: new mongoose.Types.ObjectId(roomId) };
            
            // Add the condition for lastId if it exists
            if (lastId) {
                matchConditions._id = { $lt: new mongoose.Types.ObjectId(lastId) };
            }

            const messages = await messageModel.aggregate([
                { $match: matchConditions },
                { $sort: { timestamp: -1 } }, // Sort messages by timestamp in descending order
                { $limit: limit }, // Limit the total number of messages
                {
                    $addFields: {
                        formattedDate: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: { $toDate: "$timestamp" }
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$formattedDate",
                        messages: { $push: "$$ROOT" }
                    }
                },
                { $sort: { _id: -1 } },
                {
                    $project: {
                        _id: 0,
                        date: "$_id",
                        messages: { $reverseArray: "$messages" }
                    }
                }
            ]);

            console.log(messages,"Messages in the");

            messages.reverse();

            if (messages) {
                return res.status(200).json(messages);
            }
        } else {
            return res.status(400).json({ message: "RoomId is required" });
        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
}
// const messageList = async (req, res, next) => {
//     try {
//         const { roomId ,lastId,limit=10} = req.body;

//         if (roomId) {
//             const messages = await messageModel.aggregate([
//                 { $match: { roomId: new mongoose.Types.ObjectId(roomId) } },
//                 {
//                     $addFields: {
//                         formattedDate: {
//                             $dateToString: {
//                                 format: "%d-%m-%Y",
//                                 date: { $toDate: "$timestamp" }
//                             }
//                         }
//                     }
//                 },
//                 {
//                     $group: {
//                         _id: "$formattedDate",
//                         messages: { $push: "$$ROOT" }
//                     }
//                 },
//                 { $sort: { _id: -1 } },
//                 {
//                     $project: {
//                         _id: 0,
//                         date: "$_id",
//                         messages: 1
//                     }
//                 }
//             ]);

//             messages.reverse()

//             if (messages) {
//                 return res.status(200).json(messages);
//             }
//         } else {
//             return res.status(400).json({ message: "RoomId is required" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
//     }
// }




module.exports = {
    register, login, usersList, findRoomId, messageList
}