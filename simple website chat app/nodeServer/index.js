

const io = require(`socket.io`)(8080);

const users ={};

io.on(`connection`,  socket =>{

    socket.on(`new-user-joined` , name =>{
        console.log(`new user : ${name}` )
        users[socket.id]=name;
        socket.broadcast.emit(`user-joined` , name);
    });

    socket.on(`send`,message =>{
        socket.broadcast.emit(`receive`, {message:message , name:users[socket.id]})
    });

    socket.on(`disconnect` , message =>{
        socket.broadcast.emit('disconnect', users[socket.id])
        delete users[socket.id]
    });

});

console.log("start server")