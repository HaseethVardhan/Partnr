import React from 'react'
import BottomNavbar from '../components/BottomNavbar'
import ProfileCard from '../components/ProfileCard'

const Home = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row items-center justify-between px-6 py-10'>
        <div className='font-poppins font-[700] text-3xl text-white'>Partnr</div>
        <div><img src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748694120/Vector_1_qwnwxs.png" /></div>
      </div>
      <ProfileCard />
      <BottomNavbar current='home'/>
    </div>
  )
}

export default Home