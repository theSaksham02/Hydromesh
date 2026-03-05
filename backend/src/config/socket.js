const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN || '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room based on user role
    socket.on('join_role', (role) => {
      socket.join(role);
      console.log(`User ${socket.id} joined ${role} room`);
    });

    // Handle emergency request
    socket.on('emergency_request', (data) => {
      io.to('responder').emit('new_emergency', data);
    });

    // Handle responder accept
    socket.on('accept_emergency', (data) => {
      io.to(data.citizenSocketId).emit('help_accepted', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => io;

module.exports = { initSocket, getIO };