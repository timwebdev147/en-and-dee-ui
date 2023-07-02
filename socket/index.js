const io = require("socket.io")(7000, {
    cors:{
        origin: "http://localhost:3000",
    },
});

let users = [];


function addUser(userId, userFirstName, userUsername, userRole, socketId){
    !users.some((user) => user.userId === userId) && users.push({userId, userFirstName, userUsername, userRole, socketId})
}


function removeUser(socketId){
    users = users.filter((user) => user.socketId !== socketId)
}

function getUser(userId){
    return users.find(user => user.userId === userId)
}


io.on("connection", (socket) => {
    console.log("a user connected.");
    //take userId and socketId from user
    socket.on("addUser", ({userId, userFirstName, userUsername, userRole}) => {
        addUser(userId, userFirstName, userUsername, userRole, socket.id)
        io.emit('getUsers', users)
    })

    
    socket.on("sendMessage", ({room, senderId, senderRole, senderName, senderUserName, text}) => {
        // const user = getUser();
        console.log('message sent');
        io.to(room).emit("getMessage", {
            senderId,
            senderRole,
            senderName,
            senderUserName,
            text
        })
    })
    
    socket.on("joinRoom", room => {
        socket.join(room)
        const clients = io.sockets.adapter.rooms.get(room);
        io.emit('getUsersInRoom', clients)
        console.log(`you joined ${room} room`);
        socket.on("leaveRoom", () => {
            socket.id.leave(room)
        })
    })

    
    // on disconnect
    socket.on("disconnect", () => {
        console.log('a user has disconnected')
        removeUser(socket.id)
        socket.rooms === {}
    })
})
