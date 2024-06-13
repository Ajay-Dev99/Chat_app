import React, { useEffect, useState, useContext } from 'react';
import { FaList } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { usersList } from '../Services/UserApis';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/activeUser';
import socket from '../socket';

function UsersList() {
  const { Receiver, setReceiver } = useContext(UserContext);

  const [isVisible, setIsVisible] = useState(false);
  const [users, setUsers] = useState([])
 

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = ()=>{
      try {
        usersList().then((res) => {
          if (res.status === 200) {
            setUsers(res.data)
            setReceiver(res.data[0])
          } 
        })
      } catch (error) {
        console.log("An error occured",error.message)
      }
    }

    fetchData()

    return () => {
      socket.off('message'); 
    };
  }, [])


  

  const logout = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userId")
    navigate("/login")
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };


  const selectUser = (user) => {
    setReceiver(user)
  }

  return (
    <>

      {/* Mobile */}
      <div className='p-1 block md:hidden absolute top-0  w-full'>
        <div className='flex justify-end mt-2 p-3 z-1 togglebutton'>
          <FaList className='w-[2rem] h-[1.75rem] text-black  ' onClick={toggleVisibility} />
        </div>
        <div className={`mobile-menu flex flex-col text-white ${isVisible ? 'slide-in' : ''}`} style={{ height: '100%' }}>
          <div className='flex justify-end my-1'><IoCloseCircleOutline className="w-8 h-8" onClick={() => setIsVisible(false)} /></div>

          <div className='w-full my-2 relative'>
            <input type="search" className="block w-full p-3 text-sm text-black rounded-xl bg-white " placeholder="Search User" />
            <button className="text-white absolute end-0 bottom-0 bg-[#EDA415]  font-medium rounded-xl text-sm px-4 md:px-9 py-3">Search</button>
          </div>

          <div className='flex-grow overflow-y-auto'>
            {users && users.map((user) => (
              <div key={user._id} onClick={() => {
                selectUser(user)
                toggleVisibility()
              }}  className={` py-2 ps-4 flex justify-start  gap-2 text-xl  cursor-pointer items-center ${user === Receiver ? "bg-[#5c7c8e]" : ""}`}>
                <img src="https://www.shutterstock.com/image-vector/flat-user-icon-on-website-260nw-1210365988.jpg" className='h-12 w-12 rounded-full' alt="userimage" />
                <p>{user.name}</p>
              </div>
            ))}
          </div>

          <div className='flex justify-center cursor-pointer  items-center text-white text-lg z-1 bg-[#011f2f] p-2'>
            <div onClick={logout} className='flex items-center'>
              <FaPowerOff />
              <span className='ml-2'>Sign out</span>
            </div>
          </div>
        </div>

      </div>





      {/* Laptop */}
      {<div className='hidden md:block h-screen py-5 space-y-3 '>

        {/* Search Bar  */}
        <div className='w-1/5 fixed p-2 top-0 h-1/8 bg-[#003F62]'>
          <div className="relative">
            <input type="search" className="block w-full p-3 text-sm text-black  rounded-xl bg-white " placeholder="Search User" />
            <button className="text-white absolute end-0 bottom-0 bg-[#EDA415]  font-medium rounded-xl text-sm px-4 md:px-9 py-3">Search</button>
          </div>
        </div>

        {/* UsersLIst  */}
        <div className='py-9 6/8 flex flex-col gap-4'>
          {users && users.map((userObj) => (
            <div key={userObj._id} onClick={() => selectUser(userObj)} className={` py-2 ps-4 flex justify-start  gap-2 text-xl  cursor-pointer items-center ${userObj === Receiver ? "bg-[#5c7c8e]" : ""}`}>
              <img src="https://www.shutterstock.com/image-vector/flat-user-icon-on-website-260nw-1210365988.jpg" className='h-14 w-14 rounded-full object-cover' alt="" />
              <div>
                <p className='tex-lg'>{userObj.name}</p>
                <span className='text-sm text-gray-400 text-wrap'>this is last message....</span>
              </div>
              <div>
                <span className='text-sm'>12/23/23</span>
              </div>
            </div>
          ))}
        </div>

        <div onClick={logout} className='flex justify-center cursor-pointer  items-center text-white text-lg absolute bottom-0 w-1/5 z-1 bg-[#011f2f] p-2 h-1/8'>
          <FaPowerOff />
          <span className='text-white'>Sign out</span>
        </div>

      </div>}
    </>
  );
}

export default UsersList;
