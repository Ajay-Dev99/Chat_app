const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    roomId:{
        type:mongoose.Types.ObjectId,
        ref:'rooms'
    },
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    messageType:{
        type:Number //1-text 2-image 3-pdf 4-audio
    },
    message:{
        type:String
    },
    timestamp:{
        type: Date, 
        default: Date.now
    }
},{timestamps:true})

module.exports = new mongoose.model("messages",messageSchema)