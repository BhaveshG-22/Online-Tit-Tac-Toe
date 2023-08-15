const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");

let count = 0;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("User Connected ", ++count);

  socket.on("SetRoom", (RoomData) => {
    console.log("Line 23 : In Roooom");

    console.log("RoomData-->", RoomData);
    console.log(rooms);

    // Check if the user is already in the desired room
    if (socket.rooms.has(RoomData.id)) {
      console.log("Already in the room:", RoomData.id);
      return;
    }

    //checking if we can join requested room
    if (rooms.get(RoomData.id) ? rooms.get(RoomData.id).size <= 1 : true) {
      // To leave all room before entering into another
      // socket.leaveAll();
      // console.log(socket.rooms.has(room));
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });

      // Delete all entries of socket.id in Set
      rooms.forEach((entry) => {
        if (entry.has(socket.id)) {
          entry.delete(socket.id);
        }
      });

      // Enter new Room
      socket.join(RoomData.id);

      // Update Set about new room entry
      if (!rooms.has(RoomData.id)) {
        rooms.set(RoomData.id, new Set([socket.id]));
      } else {
        rooms.set(RoomData.id, new Set([...rooms.get(RoomData.id), socket.id]));
      }
    } else {
      canSendMsg = false;
      console.log(
        "Cannot join you this room, already enough people. Count:",
        rooms.get(RoomData.id).size
      );
    }
  });

  socket.on("Msg", (Msg) => {
    console.log("----------------------------------------------------V");
    console.log(rooms);
    console.log(rooms.get(Msg.Room));
    console.log(Msg.Room);
    canSendMsg = rooms.get(Msg.Room).size <= 2 ? true : false;
    if (socket.rooms.has(Msg.Room) || rooms.get(Msg.Room).size < 2) {
      socket.broadcast.to(Msg.Room).emit("Msg", Msg.Msg);
      console.log("Msg sent- ", Msg);
    } else {
      console.log("Msg not sent");
    }
    console.log("----------------------------------------------------A");
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");

    rooms.forEach((entry) => {
      entry.delete(socket.id);
    });

    console.log(rooms);
  });
});

server.listen("2008", () => {
  console.log("Server Started");
});
