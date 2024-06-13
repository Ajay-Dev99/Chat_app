import { io } from "socket.io-client";

const socket = io("http://192.168.1.72:4000"); // replace with your server URL if different

export default socket;
