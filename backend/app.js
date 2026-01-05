const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const queryRoutes = require("./routes/queryRoutes");
const extraRoutes = require("./routes/extra");
const analyticsRoutes = require("./routes/sentiment");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 8000;
const jwt = require("jsonwebtoken");
dotenv.config();
app.use(cors());

// Socket.io setup
const { Server } = require("socket.io");
const http = require("http");
const { setSocket } = require("./socket/socket");
const { log } = require("console");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
setSocket(io)

// socket Token verfication MIDDLEWARE
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  // console.log("Token Received ", token);
  if (!token) return next(new Error("Unauthorized socket"));

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    next(new Error("Invalid socket token"));
  }
});



//Chat Setup

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Complaint Management API!");
});
app.use("/api/v1/query/auth", authRoutes);
app.use("/api/v1/query", queryRoutes);
app.use("/api/v1/query", extraRoutes);
app.use("/api/v1/query/sentiment", analyticsRoutes);

// Start server
connectDB()
  .then(async () => {
    console.log("Connected to the database successfully.");
    io.on("connection", (socket) => {
      console.log("🟢 Client io connected (app.js):", socket.id);

      socket.on("join:query", (queryId) => {
        console.log("📥 join room:", `query:${queryId}`);
        socket.join(`query:${queryId}`);
      });

      socket.on("leave:query", (queryId) => {
        console.log("Leave Room",`query:${queryId}` );
        socket.leave(`query:${queryId}`);
      });

      socket.on("disconnect", () => {
        console.log("🔴 Socket disconnected:", socket.id);
      });
    });

    setInterval(() => {
      io.emit("server:test", { time: new Date().toISOString() });
    }, 3000);

    server.listen(PORT, () =>
      console.log(
        `Server running with socket.io running on http://localhost:${PORT}`
      )
    );
  })
  .catch((error) => {
    console.error("Error in Successful Connection:", error.message);
  });
