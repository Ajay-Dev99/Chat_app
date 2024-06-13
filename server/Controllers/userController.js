const userDb = require("../Model/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const Rooms = require("../Model/roomModel");
const messageModel = require("../Model/messageModel");
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
            return res.status(400).json({ error });
        }

        const newUser = new userDb({ name, email, password });
        await newUser.save();

        const token = await createToken(newUser._id);
        res.status(200).json({ status: 1, message: "User Added Successfully", token ,userId:newUser._id});

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" })
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
                return res.status(400).json({ error: "Password Not Match" })
            }
        } else {
            return res.status(400).json({ error: "No user Found" })
        }

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" })
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
        const { roomId } = req.body;
        if (roomId) {
            const messages = await messageModel.find({ roomId })
            if (messages) {
                return res.status(200).json(messages)
            }
            return res.status(400).json("RoomId is not valid")
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" })
    }
}

module.exports = {
    register, login, usersList, findRoomId, messageList
}