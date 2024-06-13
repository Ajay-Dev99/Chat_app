import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Contexts/activeUser';
import socket from '../socket';
import { findRoomId } from '../Services/UserApis';
import SendMessage from './messageComponent/SendMessage';
import UserData from './messageComponent/UserData';
import MessageList from './messageComponent/MessageList';

export default function Messages() {
  const [roomId, setRoomId] = useState("")

  const { Receiver, sender, setSender } = useContext(UserContext);


  useEffect(() => {
    if (!sender) {
      setSender(localStorage.getItem("userId"))
    }

    if (sender && Receiver) {
      findRoomId([sender, Receiver._id]).then((res) => {
        setRoomId(res.data.roomId)
      }).catch((err) => {
        console.log(err.message);
      })
    }

  }, [Receiver])

  useEffect(() => {
    socket.emit("joinRoom", roomId)

    return () => {
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId])


  return (
    <div className='h-full flex flex-col'>
      <UserData activeUser={Receiver} />

      <div className='flex-grow overflow-y-auto ' >
        <MessageList roomId={roomId} activeUser={Receiver} />
      </div>
      <SendMessage roomId={roomId} />
    </div>

  )
}


