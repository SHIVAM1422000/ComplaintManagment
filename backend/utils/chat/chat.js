const io = req.app.get("io");


io.on("connection", (socket) => {
  console.log("client connected:", socket.id);

  socket.on("join:chat", (queryId) => {
    socket.join(queryId);
    console.log("joined room:", queryId);
  });

  socket.on("leave:chat", (queryId) => {
    socket.leave(queryId);
  });

  socket.on("chat:send", ({ queryId, sender, text }) => {
    // Broadcast to same room
    io.to(queryId).emit("chat:new", { sender, text, createdAt: new Date() });
  });
});
