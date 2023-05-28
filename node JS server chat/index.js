const express = require('express');
const app = express();
const http = require('http')
const {Server} = require('socket.io');
const cors = require('cors')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server , {
    cors:{
        // start // client site port set here
        origin:"http://localhost:3000", 
        methods:["GET","POST"],
        //end //
    }
});

// // users add for Object
const users ={};

// // socket connection 
io.on("connection" , (socket)=>{
    // /// first time user connected 
    socket.on(`new-user-joined` , name =>{
        console.log(`new user : ${name}` )
        users[socket.id]=name;
        socket.broadcast.emit(`user-joined` , name);
    });

    // send a message for client to Another client// 
    socket.on("send_message",(message)=>{
        console.log(message)
        socket.broadcast.emit("receive",{message:message , name:users[socket.id]})
    });

    // // socket disconnect 
    socket.on("disconnect", () => {
        console.log( "socket disconnect : "+ socket.id); // undefined
        delete users[socket.id]
      });
      
});


const port = process.env.PORT || 8888
server.listen(port,()=>{
    console.log("server is running port :" +port )
})