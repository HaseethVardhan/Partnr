import React from 'react'
import {Link} from 'react-router-dom'
import Button from '../components/Button'

const Authentication = () => {
  return (
    <div className='flex flex-col items-center h-screen w-screen bg-[#1a1a1a]'>
        <div className='mt-20'>
            <img src={import.meta.env.VITE_app_logo} className='w-11 h-11 rounded-lg'/>
        </div>
        <div className='flex flex-col items-center py-6'>
            <p className='text-white font-poppins font-semibold text-3xl py-2'>
                Sign up Account
            </p>
            <p className='text-[#aaaaaa] font-inter font-[400] text-base tracking-[0.8px]'>
                Enter information to create your account
            </p>
        </div>
        <div className='flex flex-col items-center gap-4 text-white font-inter font-[400] text-base w-full tracking-[0.8px] py-4'>
            <button className='flex flex-row w-[90%] bg-[#333333] h-10 rounded-lg gap-3'>
                <div className='flex items-center justify-end w-[25%]'>
                    <img className='w-4 ' src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"/>
                </div>
                <div className='flex items-center justify-center'>Continue with Google</div>
            </button>
            <button className='flex flex-row w-[90%] bg-[#333333] h-10 rounded-lg gap-3'>
                <div className='flex items-center justify-end w-[26%]'>
                    <img className='w-6 mix-blend-lighten' src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"/>
                </div>
                <div className='flex items-center justify-center'>Continue with Github</div>
            </button>
        </div>
        <div className="flex items-center w-[90%] py-6">
            <div className="flex-1" style={{ borderTop: "0.1px solid rgba(244, 244, 244, 0.2)" }}></div>
                <span className="mx-4 text-[#aaaaaa] font-inter font-[400] text-sm">or continue with email</span>
            <div className="flex-1" style={{ borderTop: "0.1px solid rgba(244, 244, 244, 0.2)" }}></div>
        </div>
        <div className='flex flex-col items-center gap-3 w-full tracking-[0.5px] py-1'>
            <div className='flex text-white text-left w-[88%] font-inter font-[400] text-base'>Email</div>
            <input className='flex flex-row w-[90%] bg-[#333333] h-9 rounded-lg gap-3 text-[#b3b3b3] font-inter font-[400] text-sm px-2' type="email" placeholder='you@youremail.com'/>
        </div>
        <div className='flex flex-col items-center gap-3 w-full tracking-[0.5px] py-3 mb-3'>
            <div className='flex text-white text-left w-[88%] font-inter font-[400] text-base'>Password</div>
            <input className='flex flex-row w-[90%] bg-[#333333] h-9 rounded-lg gap-3 text-[#b3b3b3] font-inter font-[400] text-sm px-2' type="email" placeholder='At least 8 characters.'/>
        </div>
        <Button text="Create Account"/>
        <div className='flex flex-col items-center text-center w-full py-6'>
            <p className='font-inter font-[500] text-xs tracking-[0.5px] w-[90%] text-[#aaaaaa]'>By Clicking “Create Account” you agree to our code of 
            conduct, terms of Service and privacy Policy.</p>
        </div>
        <div className='flex flex-row items-center text-center w-full py-2 font-inter font-[400] text-sm tracking-[0.1px] text-[#aaaaaa]'>
            <p className='flex flex-row items-center justify-center w-full'>
                Already have an account?&nbsp;<Link className='text-white font-[500]'> Log In</Link>
            </p>
        </div>
    </div>
  )
}

export default Authentication