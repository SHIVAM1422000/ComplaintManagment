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
dotenv.config();
app.use(cors());

// Socket.io setup
const { Server } = require("socket.io");
const http = require("http");
const Query = require("./models/Query");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

//Chat Setup

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Complaint Management API!");
});
app.use('/api/v1/query/auth',authRoutes);
app.use("/api/v1/query", queryRoutes);
app.use('/api/v1/query', extraRoutes);
app.use('/api/v1/query/sentiment', analyticsRoutes);

// Start server
connectDB()
  .then(async() => {
    console.log("Connected to the database successfully.");

    io.on("connection", (socket) => {
      console.log("Client io connected:", socket.id);
    })

    server.listen(PORT, () =>
      console.log(
        `Server running with socket.io running on http://localhost:${PORT}`
      )
    );

    //  const result = await Query.updateMany(
    //   {}, 
    //   { $set: { chat: [] } } 
    // );
    // console.log(result);
    
    // app.listen(PORT, () => {
    //   console.log(`Server is running on http://localhost:${PORT}`);
    // });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
  });
