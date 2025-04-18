import React from "react";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'

const UpdateProject = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleNext = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (title.length < 1) {
      setError("Please enter a project title.");
    } else if (description.length < 1) {
      setError("Please enter a project description.");
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/update-user-project`,
        {
          title,
        details: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); 
 
      if (response.status >= 400) {
        setError(response.data.message);
      } else {
        setError("");
        navigate("/update-work");
      }
    }
    setLoading(false);
  }

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center">
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
      <div className="flex flex-col items-center justify-center w-[90%] gap-1 py-10">
        <div className="text-left w-full">
          <h1 className="font-poppins font-[500] text-3xl tracking-[-0.5px] text-white">
            Add Projects
          </h1>
        </div>
        <div className="text-left w-full">
          <p className="font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]">
            Let people know what you are capable of building.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[90%] gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left">
            Project Title
          </p>
          <input
            className="flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white"
            type="text"
            placeholder="e.g. Portfolio Website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left">
            Description
          </p>
          <textarea
            className="flex flex-row w-full bg-[#333333] h-32 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 py-4 text-white"
            placeholder="Describe your project..."
            maxLength={400}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="flex w-full text-[#aaaaaa] text-xs font-inter font-[400] tracking-[0.5px] px-2 justify-end">
            {description?.length || 0}/400
          </p>
        </div>
        <div>
          {error && <p className='flex w-full text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2'>{error}</p>}
        </div>
      </div>
      <div className="w-full h-screen flex flex-col items-center justify-end mb-18 gap-5">
        <button className="flex flex-row w-[90%] items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]"   onClick={() => {navigate('/update-work')}}>
          Skip
        </button>
        <div className="flex flex-row w-[90%] items-center justify-between" onClick={(e) => {handleNext(e)}}>
          <Button text="Next" />
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
