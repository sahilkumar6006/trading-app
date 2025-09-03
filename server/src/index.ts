import express from "express";
import { connectDB } from "./config/connect";
import { configDotenv } from "dotenv";

configDotenv({
  path: ".env",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import rootRouter from "./routes/Routes";
app.use("/api", rootRouter);

app.listen(4000, () => {
  connectDB();
  console.log("Server started on port 3000");
});
