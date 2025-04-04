import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { UserDataContext } from "../context/UserContext";

const UpdateBio = () => {
    const { user, setuser } = useContext(UserDataContext);
    const navigate = useNavigate();

    console.log(user)

    const [bio, setBio] = React.useState('')
    

  return (
    <div className='w-full h-full bg-[#1a1a1a] flex flex-col items-center'>
        <div className='flex flex-col items-center justify-center w-[90%] gap-1 py-10'> 
            <div className='text-left w-full'>
                <h1 className='font-poppins font-[500] text-3xl tracking-[-0.5px] text-white'>Add Bio</h1>
            </div>
            <div className='text-left w-full'>
                <p className='font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]'>Describe yourself for new people.</p>
            </div>
        </div>
        <div className='flex flex-col w-[90%] gap-2'>
            <textarea className='flex flex-row w-full bg-[#333333] h-70 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 py-3 text-white' type="text" maxLength={500} placeholder='Tell us about yourself!' value={bio} onChange={(e)=>setBio(e.target.value)}/>
            <p className='flex w-full text-[#aaaaaa] text-[11px] font-inter font-[400] tracking-[0.5px] px-2 justify-end'>{bio.length}/500</p>
        </div>
        <div className='w-full h-screen flex flex-col items-center justify-end mb-18 gap-5'>
            <button className='flex flex-row w-[90%] items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]'>
                Skip
            </button>
            <Button text="Next" />
        </div>
    </div>
  )
}

export default UpdateBio