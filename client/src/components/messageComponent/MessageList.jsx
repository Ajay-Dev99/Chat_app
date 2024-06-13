import React, { useEffect, useRef, useState } from 'react'
import socket from '../../socket';
import {  getMessages } from '../../Services/UserApis';
import NoMessages from './NoMessages';
import ShowMessage from './ShowMessage';


function MessageList({ roomId, activeUser }) {
    const messagesEndRef = useRef(null);
    const [messageList, setMessageList] = useState([])
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      const handleMessageResponse = (message) => {
        setMessageList((prev) => [...prev, message]); 
      };
  
      socket.on("messageResponse", handleMessageResponse);
  
      return () => {
        socket.off("messageResponse", handleMessageResponse);
      };
    }, []); 
  
    useEffect(() => {
      const getMessageList = () => {
        try {
          if (roomId) {
            getMessages(roomId).then((res) => {
              setMessageList(res.data)
              scrollToBottom();
            }).catch((err) => {
              console.log(err.message);
            })
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      getMessageList()
    }, [activeUser, roomId])
  
  
    useEffect(() => {
      scrollToBottom();
    }, [messageList]);
  
   return (
      <>
        {messageList && messageList.length ? (
          <div className='p-3 space-y-2 mt-3 ' >
            {messageList.map((message) => (
              <ShowMessage message={message} key={message._id}  />
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        ) : (
          <NoMessages />
        )}
      </>
    );
  }

export default MessageList



  
 