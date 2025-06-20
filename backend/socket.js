/**
 * Socket.io setup and event handlers
 */

module.exports = (io) => {
  // Store online users
  const onlineUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User authentication
    socket.on('authenticate', (userId) => {
      if (userId) {
        // Add user to online users
        onlineUsers.set(userId, socket.id);
        socket.userId = userId;
        
        // Join user to their private room
        socket.join(`user:${userId}`);
        
        // Emit user online event
        io.emit('userStatus', { userId, status: 'online' });
        
        console.log(`User authenticated: ${userId}`);
      }
    });

    // Join a chat room
    socket.on('joinRoom', (roomId) => {
      socket.join(`room:${roomId}`);
      console.log(`User joined room: ${roomId}`);
    });

    // Leave a chat room
    socket.on('leaveRoom', (roomId) => {
      socket.leave(`room:${roomId}`);
      console.log(`User left room: ${roomId}`);
    });

    // Send a message
    socket.on('sendMessage', (data) => {
      const { roomId, message } = data;
      
      // Broadcast to room (including sender)
      io.to(`room:${roomId}`).emit('newMessage', message);
      
      console.log(`Message sent to room ${roomId}`);
    });

    // Send a direct message
    socket.on('sendDirectMessage', (data) => {
      const { recipientId, message } = data;
      
      // Get recipient socket id
      const recipientSocketId = onlineUsers.get(recipientId);
      
      // Send to recipient if online
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('newDirectMessage', message);
      }
      
      // Always send to sender
      socket.emit('newDirectMessage', message);
      
      console.log(`Direct message sent to user ${recipientId}`);
    });

    // Typing indicator
    socket.on('typing', (data) => {
      const { roomId, userId, isTyping } = data;
      
      // Broadcast to everyone in the room except sender
      socket.to(`room:${roomId}`).emit('userTyping', { userId, isTyping });
    });

    // Booking notification
    socket.on('bookingCreated', (data) => {
      const { musicianId } = data;
      
      // Notify musician
      io.to(`user:${musicianId}`).emit('newBookingNotification', data);
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      if (socket.userId) {
        // Remove from online users
        onlineUsers.delete(socket.userId);
        
        // Emit user offline event
        io.emit('userStatus', { userId: socket.userId, status: 'offline' });
        
        console.log(`User disconnected: ${socket.userId}`);
      } else {
        console.log(`Socket disconnected: ${socket.id}`);
      }
    });
  });
};
