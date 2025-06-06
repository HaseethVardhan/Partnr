import React from 'react'
import { useNavigate } from 'react-router-dom';

const BottomNavbar = ({ current }) => {

    const navigate = useNavigate();
    
    const divStyles = {
        home: current === 'home' ? 'bg-[#8B5CF6]' : 'bg-[#333333]',
        search: current === 'search' ? 'bg-[#8B5CF6]' : 'bg-[#333333]',
        notifications: current === 'notifications' ? 'bg-[#8B5CF6]' : 'bg-[#333333]',
        profile: current === 'profile' ? 'bg-[#8B5CF6]' : 'bg-[#333333]'
    };
    
    return (
    <div className='w-full h-[56px] flex flex-col items-center justify-center fixed bottom-20 z-999'>
        <div className='flex flex-row items-center justify-between max-w-54 px-2 w-full h-full border-[4px] border-[#333333] rounded-md'>
            <div onClick={()=>{navigate('/')}} className={`h-[32px] w-[32px] flex items-center ${divStyles.home} justify-center rounded-lg`}><img className='h-8 w-8 object-contain brightness-0 invert-100' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748697872/20250531_185229_rc95eb.png" alt="" /></div>
            <div className={`h-[32px] w-[32px] flex items-center ${divStyles.search} justify-center rounded-lg`}><img className='h-4 w-4 object-contain brightness-0 invert-100' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748696310/Vector_3_i9zv93.png" alt="" /></div>
            <div onClick={()=>{navigate('/notifications')}} className={`h-[32px] w-[32px] flex items-center ${divStyles.notifications} justify-center rounded-lg`}><img className='h-4 w-4 object-contain brightness-0 invert-100' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748696310/Vector_3_i9zv93.png" alt="" /></div>
            <div onClick={()=>{navigate('/profile')}} className={`h-[32px] w-[32px] flex items-center ${divStyles.profile} justify-center rounded-lg`}><img className='h-8 w-8 object-contain brightness-0 invert-100' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748697160/20250531_184056_k00uxp.png" alt="" /></div>
        </div>
    </div>
  )
}

export default BottomNavbar