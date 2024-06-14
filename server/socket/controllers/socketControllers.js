const { default: mongoose } = require("mongoose");
const messageModel = require("../../Model/messageModel");
const Rooms = require("../../Model/roomModel")

const saveMessage = async (message) => {
    try {
        const newMessage = new messageModel({
            roomId: new mongoose.Types.ObjectId(message.roomId),
            senderId: new mongoose.Types.ObjectId(message.senderId),
            receiverId: new mongoose.Types.ObjectId(message.receiverId),
            message: message.message,
            messageType: parseInt(message.messageType),
            timestamp: message.timestamp
        });

        await newMessage.save();
        return { status: true, msg: newMessage };
    } catch (error) {
        console.error(error);
        return { status: false };
    }
};

module.exports = {
    saveMessage
}