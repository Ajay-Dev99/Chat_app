import React, { useContext,  useState } from 'react'
import { FiSend } from "react-icons/fi";
import { BsEmojiGrin } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { UserContext } from "../../Contexts/activeUser";
import socket from '../../socket';
import Emoji from './Emoji';

function SendMessage({ roomId }) {
    const [message, setMessage] = useState("")
    const [visible,setVisible] = useState(false)
    const { sender, Receiver } = useContext(UserContext)

    const emojiDatFromComponent = (emojiData)=>{
      setMessage(prevInputValue => prevInputValue + emojiData.emoji);
    }
  
    const createMessage = () => {
      if (!message.trim()) return;
      const newMessage = {
        roomId,
        senderId: sender,
        receiverId: Receiver._id,
        message: message,
        messageType: 1,
        timestamp: new Date().toISOString()
      }
      socket.emit("sendmessage", newMessage)
      setVisible(false)
      setMessage('')
    }
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        createMessage();
      }
    };
  
  
    return (
      <>
      {visible && <Emoji callback={emojiDatFromComponent}/>}
     <div className='flex  gap-3 items-center px-5 mt-4 mb-2 sticky bottom-2 md:bottom-0 p-2 bg-white'>
        <input type="text" className="flex-grow rounded-md  py-3 border border-gray-600" onChange={(e) => setMessage(e.target.value)} value={message} onKeyDown={handleKeyDown} />
        <RiAttachment2 className='w-6 h-6 text-[#EDA415] ' />
        <BsEmojiGrin className='w-6 h-6 text-[#EDA415] md:hover:scale-150' onClick={()=>setVisible(!visible)}/>
       <div className='md:hover:scale-150'> <FiSend className='w-6 h-6' onClick={createMessage} /></div>
    </div>
      </>
    )
  }

export default SendMessage
