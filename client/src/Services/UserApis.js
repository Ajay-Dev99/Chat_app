import { userInstance } from "../axios/axiosInstance";

export const userSignup = (values) => {
    return userInstance.post("/register",values)
}

export const userLogin = (values) => {
    return userInstance.post("/login",values)
}

export const usersList = ()=>{
    return userInstance.post("/usersList")
}

export const findRoomId = (users)=>{
    return userInstance.post("/findroomid",users)
}
export const getMessages = ({roomId,lastId})=>{
    return userInstance.post("/getMessages",{roomId,lastId})
}