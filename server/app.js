const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const { setupSocket } = require("./socket");

const userRoutes = require("../server/Routes/userRoutes");

//app
const app = express();

//socket connection
const server = http.createServer(app);
setupSocket(server);

// db connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB connection successful");
}).catch((err) => {
    console.log(err);
});

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/", userRoutes);

//port
const PORT = process.env.PORT || 4000;

//listener
server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
