import React from 'react';
import EmojiPicker from 'emoji-picker-react';

function Emoji({callback}) {

  const onEmojiClick = (emojiData) => {
    callback(emojiData)
  };



  return (
    <div className='ms-auto absolute flex justify-center md:justify-end  w-full md:right-2 bottom-12 '>
      <EmojiPicker onEmojiClick={onEmojiClick} />
     
    </div>
  );
}

export default Emoji;
