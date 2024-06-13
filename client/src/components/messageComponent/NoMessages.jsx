import React from 'react'

function NoMessages() {
    return (
      <div className=' h-full w-full flex justify-center items-center flex-col'>
        <h1 className='text-4xl font-bold text-gray-500 opacity-40'>No Messages Found.</h1>
        <p className='text-gray-500 opacity-40 font-bold'>Sent a message to start the conversation</p>
      </div>
    )
  }

export default NoMessages
