import axios from 'axios'
import { toast } from 'react-toastify';


const userInstance = axios.create({
    // baseURL:  "http://192.168.1.72:4000"
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4000"

});

userInstance.interceptors.request.use((request)=>{
    const token = localStorage.getItem("jwt")
    request.headers.Authorization = `Bearer ${token}`
    return request;  
})

// userInstance.interceptors.response.use(
//     response => response,
//     error => {
//         console.log(error,"error");
//         if(error.response.data.message === 'jwt expired'){
//             localStorage.removeItem("jwt")
//             window.location.href = "/login"
//         }
//       if (error.response.status === 500) {
//         if(error.response.data.message === "invalid signature"){
//              localStorage.removeItem("jwt")
//             window.location.href = "/login"
//             return error;
//         }else if(error.response.data.message === "jwt malformed"){
//             localStorage.removeItem("jwt")
//             window.location.href = "/login"
//             return error;
//         }
//       }
//     });

userInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response && (error.response.data.message === "jwt expired" || error.response.data.message === "invalid signature" || error.response.data.message === "invalid token")) {
            localStorage.removeItem("jwt");
            window.location.href = "/login";
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error.response ? error.response.data : error.message);
        }
    }
);


export { userInstance };