import React from 'react'

const Button = (props) => {
  return (
    <button className='flex flex-row w-[90%] items-center justify-center  bg-[#8b5cf6] h-13 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px]'>
        <div className='flex items-center  mx-2'>
            {props.text}
        </div>
        <div className='flex items-center'>
            <img className='w-5 mx-2' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1743521650/Vector_jyg7yx.png" />
        </div>
    </button>
  )
}

export default Button