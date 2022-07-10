import React from 'react'

function Loading() {
  return (
    <div className='bg-black w-[100vw] h-[100vh] flex items-center justify-center px-12 sm:px-24'>
        <img 
            className='w-full max-w-[520px] object-contain'
            src="http://pngteam.com/images/ipl-logo-png-transparent-images-1772x863_0599fc71_transparent.png" 
            alt="IPL" />
    </div>
  )
}

export default Loading