import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'


const UpdateBio = () => {
    const navigate = useNavigate();

    const [bio, setBio] = React.useState('')

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null) 

    const handleNext = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (bio.length < 1) {
            setError("Please enter a bio.")
        } else {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update-user-bio`, {
                bio
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if (response.status >= 400) {
                setError(response.data.message)
            } else {
                setError('')
                navigate('/update-links')
            }
        }
        setLoading(false)
    }
    

  return (
    <div className='w-full h-full bg-[#1a1a1a] flex flex-col items-center select-none'>
        {loading && <div className="absolute top-0 left-0 w-full h-full flex items-center backdrop-blur-3xl justify-center z-50">
        <Trefoil
  size="40"
  stroke="4"
  strokeLength="0.15"
  bgOpacity="0.3"
  speed="1.4"
  color="#8b5cf6" 
/>
        </div>}
        <div className='flex flex-col items-center justify-center w-[90%] gap-1 py-10'> 
            <div className='text-left w-full'>
                <h1 className='font-poppins font-[500] text-3xl tracking-[-0.5px] text-white'>Add Bio</h1>
            </div>
            <div className='text-left w-full'>
                <p className='font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]'>Describe yourself for new people.</p>
            </div>
        </div>
        <div className='flex flex-col w-[90%] gap-2'>
            <textarea className='flex flex-row w-full bg-[#333333] h-70 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 py-3 text-white select-all'  type="text" maxLength={500} placeholder='Tell us about yourself!' value={bio} onChange={(e)=>setBio(e.target.value)}/>
            <p className='flex w-full text-[#aaaaaa] text-[11px] font-inter font-[400] tracking-[0.5px] px-2 justify-end'>{bio.length}/500</p>
            {error && <p className='flex w-full text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2'>{error}</p>}
        </div>
        <div className='w-[90%] h-screen flex flex-col items-center justify-end mb-18 gap-5'>
            <button className='flex flex-row w-full items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]' onClick={()=>{navigate('/update-links')}}>
                Skip
            </button>
            <div className="w-full flex flex-row items-center justify-end gap-2" onClick={(e)=>{handleNext(e)}}>
                <Button text="Next" />
            </div>
        </div>
    </div>
  )
}

export default UpdateBio