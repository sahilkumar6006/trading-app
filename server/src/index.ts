import express from "express";
import { connectDB } from "./config/connect";
import { configDotenv } from "dotenv";
import { Server } from "socket.io";
import http from "http";

configDotenv({
  path: ".env",
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import rootRouter from "./routes/Routes";
import { getPaginatedData } from "./controllers/PraticePagination";
app.use("/api", rootRouter);

app.get("/getPaginatedData", getPaginatedData);

app.listen(4000, () => {
  connectDB();
  console.log("Server started on port 3000");
});
