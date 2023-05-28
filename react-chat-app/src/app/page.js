"use client"

import React, { useEffect, useState } from 'react';

import  io  from 'socket.io-client';
const portSocket = process.env.PORT_SOCKET || 'http://localhost:8888'
const socket = io.connect(portSocket) ;
console.log(portSocket)





function Home() {
  const [inputfieldMessage, setInputfieldMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");
  const sendMessage=(e)=>{
    e.preventDefault();
    socket.emit("send_message",inputfieldMessage );

  };

  useEffect(() => {
    socket.on("receive",(data)=>{
      setReceiveMessage(  ` ${data.name} :  ${data.message}`)
    })
    const userName = prompt("Enter your name to join");
    socket.emit('new-user-joined', userName);
  }, [socket]);

  

  return (
    <main className='px-2'>
      <h1>Chat App</h1>

      <div>
        <form  className='flex'>
          <input type="text" onChange={(e)=>setInputfieldMessage(e.target.value)}  placeholder='write something to send' className='border border-2 border-green-500  py-2 px-2 rounded-lg w-[100%]' />
          <button onClick={sendMessage} className='border border-2 border-blue-400 p-1 rounded-lg'>Send</button>
        </form>
      </div>
      <h1>{receiveMessage}</h1>
    </main>
  );
};

export default Home;
