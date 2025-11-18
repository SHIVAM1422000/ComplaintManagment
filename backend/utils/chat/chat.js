const io = req.app.get("io");


io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  // join room for a ticket chat: client will emit 'join:chat' with queryId
  socket.on('join:chat', (queryId) => {
    socket.join(`chat_${queryId}`);
  });

  socket.on('leave:chat', (queryId) => {
    socket.leave(`chat_${queryId}`);
  });

  // when a client emits chat:send, persist & broadcast
  socket.on('chat:send', async (payload) => {
    // payload: { queryId, sender, text }
    try {
      const ChatMessage = require('../../models/ChatMessage');
      const cm = await ChatMessage.create({ queryId: payload.queryId, sender: payload.sender, text: payload.text });
      io.to(`chat_${payload.queryId}`).emit('chat:new', cm);
    } catch (e) { console.error('chat send error', e); }
  });

  socket.on('disconnect', () => {});
});