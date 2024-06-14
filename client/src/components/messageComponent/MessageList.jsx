import React, { useEffect, useRef, useState } from 'react'
import socket from '../../socket';
import { getMessages } from '../../Services/UserApis';
import NoMessages from './NoMessages';
import ShowMessage from './ShowMessage';
import { getRelativeDate } from '../../utils/dateUtils';


function MessageList({ roomId, activeUser }) {
  const messagesEndRef = useRef(null);
  const [messageList, setMessageList] = useState([])


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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {

    const handleMessageResponse = (newMessage) => {
      setMessageList((prev) => {
        const messageDate = new Date(newMessage.timestamp);
        const formattedDate = messageDate.toLocaleDateString('en-GB').replace(/\//g, '-'); 
        const dateIndex = prev.findIndex(obj => obj.date === formattedDate);

        if (dateIndex >= 0) {
          const updatedMessages = [...prev];
          updatedMessages[dateIndex].messages.push(newMessage);
          return updatedMessages;
        } else {
          return [...prev, { date: formattedDate, messages: [newMessage] }];
        }
      });
    };

    socket.on("messageResponse", handleMessageResponse);

    return () => {
      socket.off("messageResponse", handleMessageResponse);
    };
  }, []);

  useEffect(() => {
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
            <div key={message.date}>

              <div key={message.date} className=' text-center sticky top-0 z-1'>
                {<span key={message.date} className='bg-black text-white p-2 rounded-md'>{getRelativeDate(message.date)}</span>}
              </div>
              {message.messages.map((msg) => (
                <ShowMessage message={msg} key={msg._id} />
              ))}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      ) :
        <NoMessages />
      }

    </>
  );
}

export default MessageList

