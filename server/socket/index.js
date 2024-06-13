const socketIo = require('socket.io');
const { saveMessage } = require('./controllers/socketControllers');

const setupSocket = (server) => {
    try {
        const io = socketIo(server, {
            cors: {
                // origin: "*", // URL of your React app,
                credentials: true
            }
        });

        io.on('connection', (socket) => {

            socket.on('joinRoom', (roomId) => {
                socket.join(roomId); 
                console.log(`User joined room ${roomId}`);
              });

              socket.on('sendmessage', async(message) => {     
                const messageSave = await saveMessage(message)
                if(messageSave.status){
                    io.in(message.roomId).emit("messageResponse", messageSave.msg);
                }
            });

              socket.on('leaveRoom', (roomId) => {
                socket.leave(roomId);
                console.log(`User left room ${roomId}`);
              });
            



            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { setupSocket };
