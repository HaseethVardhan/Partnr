import React from 'react'
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateLinks = () => {

    const navigate = useNavigate()

    const [portfolio, setPortfolio] = React.useState('')
    const [xlink, setXlink] = React.useState('')
    const [linkedin, setLinkedin] = React.useState('')

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null) 

    const handleNext = async(e) => {
        setLoading(true)
        e.preventDefault()
        if (portfolio.length < 1 && xlink.length < 1 && linkedin.length < 1) {
            setError("Please enter at least one link.")
        } else {
            const links = {}
            if (portfolio) links.portfoliolink = portfolio
            if (xlink) links.xlink = xlink
            if (linkedin) links.linkedInlink = linkedin

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update-user-links`, links, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if (response.status >= 400) {
                setError(response.data.message)
            } else {
                setError('')
                navigate('/update-project')
            }
        }
        setLoading(false)
    }

  return (
    <div className='w-full h-full bg-[#1a1a1a] flex flex-col items-center'>
        <div className='flex flex-col items-center justify-center w-[90%] gap-1 py-14'> 
            <div className='text-left w-full'>
                <h1 className='font-poppins font-[500] text-3xl tracking-[-0.5px] text-white'>Add Links</h1>
            </div>
            <div className='text-left w-full'>
                <p className='font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]'>Enter your portfolio and social media links.</p>
            </div>
        </div>
        <div className='flex flex-col w-[90%] gap-2'>
            <p className='text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left'>Portfolio</p>
            <input className='flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white' type="text" placeholder='you.com' value={portfolio} onChange={(e) => {setPortfolio(e.target.value)}}/>
        </div>
        <div className='flex flex-row items-center justify-between w-[90%] py-8 gap-4'>
            <div className='flex flex-col w-[90%] gap-2'>
                <p className='text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left'>X</p>
                <input className='flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white' type="text" placeholder='X.com/you' value={xlink} onChange={(e) => {setXlink(e.target.value)}}/>
            </div>
            <div className='flex flex-col w-[90%] gap-2'>
                <p className='text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left'>Linkedin</p>
                <input className='flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white' type="text" placeholder='Linkedin.com/you' value={linkedin} onChange={(e) => {setLinkedin(e.target.value)}}/>
            </div>
        </div>
        <div className='flex flex-col w-[90%] gap-2'>
            {error && <p className='flex w-full text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2'>{error}</p>}
        </div>
        <div className='w-full h-screen flex flex-col items-center justify-end mb-18 gap-5'>
            <button className='flex flex-row w-[90%] items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]' onClick={()=>{navigate('/update-project')}}>
                Skip
            </button>
            <div className='flex flex-row w-[90%] items-center justify-center h-12 rounded-lg bg-[#3b82f6] text-white font-inter font-[500] text-base tracking-[0.5px]' onClick={(e) => {handleNext(e)}}>
                <Button text="Next" /> 
            </div>
        </div>
    </div>
  )
}

export default UpdateLinks