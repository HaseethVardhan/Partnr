import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'

const UpdateName = () => {
    const navigate = useNavigate()
    const { user, setuser } = useContext(UserDataContext)

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [error, setError] = React.useState('')

    const [loading, setLoading] = React.useState(false)

    const handleSaveName = async() => {
        setLoading(true)
        
        if (!firstName || !lastName) {
            setError('Please fill all the fields.')
            return
        }
        
        if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
            setError('Names can only contain letters.')
            return
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register-user`,{
            email: user.email,
            username: user.username,
            authtype: user.authtype,
            firstname: firstName,
            lastname: lastName,
            password: user.password
        })

        if(response.status >= 400) {
            setError(response.data.message)
            navigate('/authentication')
        } else {
            setError('')
            setuser(response.data.data.user)
            localStorage.setItem('token', response.data.data.token)
            navigate('/update-profession')
        }

        setLoading(false)
    }

    return (
        <div className='w-full h-full bg-[#1a1a1a] flex flex-col items-center'>
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
                    <h1 className='font-poppins font-[500] text-3xl tracking-[-0.5px] text-white'>Add Name</h1>
                </div>
                <div className='text-left w-full'>
                    <p className='font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]'>Your name will be visible on your profile card.</p>
                </div>
            </div>
            <div className='flex flex-col w-[90%] gap-4'>
                <div className='flex flex-col gap-2'>
                    <p className='text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left'>First Name</p>
                    <input 
                        className='flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white' 
                        type="text" 
                        placeholder='Enter your first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left'>Last Name</p>
                    <input 
                        className='flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white' 
                        type="text" 
                        placeholder='Enter your last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                {error && <p className='flex w-full text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2'>{error}</p>}
            </div>
            <div className='w-[90%] h-screen flex flex-col items-center justify-end mb-18' onClick={handleSaveName}>
                <Button text="Next" />
            </div>
        </div>
    )
}

export default UpdateName