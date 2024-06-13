import React, { useContext} from 'react'
import { TiTick } from "react-icons/ti";
import { UserContext } from '../../Contexts/activeUser';

function ShowMessage({ message }) {
    const { sender } = useContext(UserContext)

    const convertTimeStamp = (timeStamp)=>{
        console.log(timeStamp,"stsa,[");
        const date = new Date(timeStamp);
        const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        console.log(timeString,"sfkjsdkj");
        return timeString;
    }
  
    return (
      <div className={`bg-[#0077b6] w-2/3  md:w-[30rem] text-white rounded-lg p-2 md:p-3 flex flex-col text-wrap ${message.senderId === sender ? ' ms-auto' : ""}`}>
        <p className='flex-1'>{message.message}</p>
        <div className='flex justify-end items-center'>
          <span className=''>{convertTimeStamp(message.timestamp)} </span>
          <span><TiTick /></span>
        </div>
  
      </div>
    )
  }

export default ShowMessage
