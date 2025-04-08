import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

const UpdatePreferences = () => {

  const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
  
    const navigate = useNavigate();

    const preferences = [
            "Artificial Intelligence", "Graphic Design",
            "Backend Development", "Web3", "Machine Learning",
            "Cybersecurity", "Mobile App Development", "DevOps",
            "Cloud Computing", "UI/UX Design",
            "Data Science", "Web Development",
            "Frontend Development", "Game Development"
        ];
    
        const [selectedPreferences, setSelectedPreferences] = React.useState([]);
    
        const handlePreferenceSelect = (preference) => {
            if (selectedPreferences.includes(preference)) {
                setSelectedPreferences(selectedPreferences.filter(s => s !== preference));
            } else if (selectedPreferences.length < 3) {
                setSelectedPreferences([...selectedPreferences, preference]);
            }
        };

        const handleSave = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/user/update-user-preferences`,
                    { preferences: selectedPreferences },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setLoading(false);
                navigate("/");
            } catch (error) {
                setLoading(false);
                setError(error.response.data.message);
            }
        }

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-[90%] gap-1 py-10">
        <div className="text-left w-full">
          <h1 className="font-poppins font-[500] text-3xl tracking-[-0.5px] text-white">
            Update Preferences
          </h1>
        </div>
        <div className="text-left w-full">
          <p className="font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]">
            This helps us to match you with the right people. Choose upto 3 skills.
          </p>
        </div>
      </div>
      <div className='flex flex-row flex-wrap gap-2 w-[90%] justify-start'>
            {preferences.map((preference) => (
                    <div 
                        key={preference}
                        onClick={() => handlePreferenceSelect(preference)}
                        className={`h-9 cursor-pointer font-inter font-[500] text-sm tracking-[0.5px] flex items-center justify-center text-center px-5 rounded-xl ${
                            selectedPreferences.includes(preference) 
                            ? 'bg-[#a27df8] text-white' 
                            : 'bg-[#333333] text-[#b3b3b3]'
                        }`}
                    >
                        {preference}
                    </div>
                ))}
        </div>
        <div className="w-[90%] h-screen flex flex-col items-center justify-end mb-18 gap-5" onClick={()=>{handleSave()}}>
        <Button text="Save" />
      </div>
    </div>
  );
};

export default UpdatePreferences;
