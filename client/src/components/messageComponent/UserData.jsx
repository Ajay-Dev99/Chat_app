import React from 'react'

function UserData({ activeUser }) {

  return (

    <>
      {activeUser &&
        <div className='w-full  bg-[#c1c1c1] border border-gray-200  sticky top-0 z-10'>

          <div className=' p-2 flex justify-start items-center gap-2 text-xl'>
            <img src="https://www.shutterstock.com/image-vector/flat-user-icon-on-website-260nw-1210365988.jpg" className='h-12 w-12 rounded-full' alt="userdp" />
            <div>
              <p>{activeUser ? activeUser.name : "none"}</p>
              <span className='text-sm'>Online</span>
            </div>
          </div>
        </div>
      }
    </>


  )
}

export default UserData
