import axios from 'axios'


const userInstance = axios.create({
    baseURL:  "http://192.168.1.72:4000"
    // baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4000"

});

userInstance.interceptors.request.use((request)=>{
    const token = localStorage.getItem("jwt")
    request.headers.Authorization = `Bearer ${token}`
    return request;  
})


export { userInstance };