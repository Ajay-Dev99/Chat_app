import React, { useContext} from 'react'
import { TiTick } from "react-icons/ti";
import { UserContext } from '../../Contexts/activeUser';

function ShowMessage({ message }) {
    const { sender } = useContext(UserContext)

    const convertTimeStamp = (timeStamp)=>{
        const date = new Date(timeStamp);
        const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return timeString;
    }
  
    return (
      <div className={`bg-[#6e226a] w-2/3  md:w-[30rem] text-white rounded-lg p-2 md:p-3 flex flex-col text-wrap my-2 ${message.senderId === sender ? ' ms-auto' : ""}`}>
        <span className='flex-1 text-lg break-words'>{message.message}</span>
        <div className='flex justify-end items-center text-xs'>
          <span className=''>{convertTimeStamp(message.timestamp)} </span>
          <span><TiTick /></span>
        </div>
  
      </div>
    )
  }

export default ShowMessage
