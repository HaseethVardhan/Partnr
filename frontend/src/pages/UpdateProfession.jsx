import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const UpdateProfession = () => {
    const navigate = useNavigate()
   
    const [profession, setProfession] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleNext = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (!profession) {
            setError("Please fill all the fields.")
        } else {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update-user-profession`, {
                profession
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status >= 400) {
                setError(response.data.message)
            } else {
                setError('')
                navigate('/update-skills')
            }
        }
        setLoading(false)
    }

  return (
    <div className='w-full h-full bg-[#1a1a1a] flex flex-col items-center'>
        <div className='flex flex-col items-center justify-center w-[90%] gap-1 py-10'> 
            <div className='text-left w-full'>
                <h1 className='font-poppins font-[500] text-3xl tracking-[-0.5px] text-white'>Add Profession</h1>
            </div>
            <div className='text-left w-full'>
                <p className='font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]'>Your profession will be visible on your profile card.</p>
            </div>
        </div>
        <div className='flex flex-col w-[90%] gap-2'>
            <input className='flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white' type="text" placeholder='e.g student/web developer' value={profession} onChange={(e) => {setProfession(e.target.value)}}/>
            {error && <p className='flex w-full text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2'>{error}</p>}
        </div>
        <div className='w-[90%] h-screen flex flex-col items-center justify-end mb-18' onClick={(e) => {handleNext(e)}}>
            <Button text="Next" />
        </div>
    </div>
  )
}

export default UpdateProfession