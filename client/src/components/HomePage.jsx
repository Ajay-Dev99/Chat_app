import React, {  useEffect } from 'react';
import UsersList from './UsersList';
import Messages from './Messages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserProvider } from '../Contexts/activeUser';
function HomePage() {
const navigate = useNavigate()

 

  useEffect(()=>{
   try {
    const jwtToken = localStorage.getItem("jwt")
    if(!jwtToken){
      toast.error("AUTHENTICATION FAILED")
      navigate("/login")
    }
   } catch (error) {
   }
  },[])
  return (
    <UserProvider>
      <div className='flex flex-col h-full'>
        <div className=' flex flex-col md:flex-row'>
          <div className='overflow-y-auto md:w-1/5 border-r-2 border-black bg-[#074466] text-white '>
            <UsersList />
          </div>
          <div className=' w-full md:w-4/5 h-lvh'>
            <Messages />
          </div>
        </div>
      </div>
      </UserProvider>
  );
}

export default HomePage;
