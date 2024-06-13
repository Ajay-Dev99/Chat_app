const express = require("express");
const { register, login, usersList, findRoomId, messageList } = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/usersList",userAuth,usersList)
router.post("/findroomid",userAuth,findRoomId)
router.post("/getMessages",userAuth,messageList)


module.exports = router;