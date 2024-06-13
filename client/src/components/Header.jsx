import React from 'react'
import { FaPowerOff } from "react-icons/fa";

function Header() {
    return (
        <>
            <div className=' flex justify-around items-center bg-[#003F62] text-white py-4'>
                <div className='md:w-1/4'>   
                        <div className="relative">

                            <input type="search"  className="block w-full p-3 text-sm text-black  rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search Anything"  />
                            <button  className="text-white absolute end-0 bottom-0 bg-[#EDA415] focus:ring-4 font-medium rounded-xl text-sm px-4 md:px-9 py-3">Search</button>
                        </div>
                </div>
                <div className='flex justify-center items-center gap-1 cursor-pointer hover:animate-pulse'>
                   
                <FaPowerOff />
                   <span className='text-white'>Sign out</span>

                    
                </div>

            </div>
        </>
    )
}

export default Header
