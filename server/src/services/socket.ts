import { Socket } from "socket.io";
import { io } from "../index";

io.on("connection", (Socket) => {
  console.log("a user connected");
  Socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  Socket.on("update_price", (price) => {
    console.log("price updated", price);
  });
});
