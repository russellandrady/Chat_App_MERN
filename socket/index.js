const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let activeUsers = [];
io.on("connection", (socket) => {
  //add new user
  socket.on("new-user-add", (newUserId) => {
    //if there is no user added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    console.log("Connected Users", activeUsers);
    io.emit("get-users", activeUsers); //using get-users, can get the data in react side(front end)
  });
  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});
