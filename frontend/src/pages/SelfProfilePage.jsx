import React from 'react'
import BottomNavbar from '../components/BottomNavbar'

const SelfProfilePage = () => {
  return (
    <div className='flex flex-col relative h-screen'>
        <div className='flex flex-row items-center justify-between px-4 py-10'>
            <div className='flex flex-row items-center gap-3'>
                <img className='h-5 w-6 object-contain' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"/>
                <div className='font-poppins font-[500] text-3xl  text-white'>James</div>
            </div>
            <div className='flex flex-row items-center gap-2 px-2'>
                <img className='h-7 w-6 object-contain' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781439/Group_dpokwd.png"/>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center py-5'>
                <img className='h-30 w-30 rounded-full object-cover' src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp"/>
            </div>
            <div className='flex flex-col items-center justify-center '>
                <div className='font-poppins font-[500] text-2xl text-white'>
                    James
                </div>
                <div className='font-poppins font-[500] text-base text-[#aaaaaa]'>
                    @p.james
                </div>
            </div>
        </div>
        <BottomNavbar current='profile' />
    </div>
  )
}

export default SelfProfilePage