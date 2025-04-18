import React from 'react'
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'

const UpdateSkills = () => {

    const softwareSkills = [
        "Artificial Intelligence", "Graphic Design",
        "Backend Development", "Web3", "Machine Learning",
        "Cybersecurity", "Mobile App Development", "DevOps",
        "Cloud Computing", "UI/UX Design",
        "Data Science", "Web Development",
        "Frontend Development", "Game Development"
    ];

    const navigate = useNavigate()
    const [selectedSkills, setSelectedSkills] = React.useState([]);

    const handleSkillSelect = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else if (selectedSkills.length < 5) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleNext = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (selectedSkills.length < 1) {
            setError("Please select at least one skill.")
        } else {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/update-user-skills`, {
                skills: selectedSkills
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if (response.status >= 400) {
                setError(response.data.message)
            } else {
                setError('')
                navigate('/update-bio')
            }
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
                <h1 className='font-poppins font-[500] text-3xl tracking-[-0.5px] text-white'>Pick a Skill</h1>
            </div>
            <div className='text-left w-full'>
                <p className='font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]'>Highlight what you do best, you can choose up to 5 skills.</p>
            </div>
        </div>
        <div className='flex flex-row flex-wrap gap-2 w-[90%] justify-start'>
            {softwareSkills.map((skill) => (
                    <div 
                        key={skill}
                        onClick={() => handleSkillSelect(skill)}
                        className={`h-9 cursor-pointer font-inter font-[500] text-sm tracking-[0.5px] flex items-center justify-center text-center px-5 rounded-xl ${
                            selectedSkills.includes(skill) 
                            ? 'bg-[#a27df8] text-white' 
                            : 'bg-[#333333] text-[#b3b3b3]'
                        }`}
                    >
                        {skill}
                    </div>
                ))}
        </div>
        <div className='flex flex-col w-[90%] gap-2 mt-5'>
            {error && <p className='flex w-full text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2'>{error}</p>}
        </div>
        <div className='w-[90%] h-screen flex flex-col items-center justify-end mb-18 gap-5' onClick={(e)=>{handleNext(e)}}>
            <Button text="Next" />
        </div>
    </div>
  )
}

export default UpdateSkills