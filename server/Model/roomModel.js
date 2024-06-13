const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
   users:[ {
    type:mongoose.Types.ObjectId,
    ref:'users'
}]
    
})

module.exports = new mongoose.model('rooms',roomSchema)