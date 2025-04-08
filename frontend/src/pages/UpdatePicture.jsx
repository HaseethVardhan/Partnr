import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

const UpdatePicture = () => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const [image, setImage] = React.useState(
    "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1743434367/default_pfp_wngp1j.jpg"
  );

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/get-user-picture`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        setImage(response.data.data.picture);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 1024 * 1024) {

      setSelectedFile(file);
      const formData = new FormData();
      formData.append("picture", file);
    
      setLoading(true);
      setError(null);

      try {
 
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/update-user-picture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setImage(response.data.data.pictureurl);
      } catch (err) {
        setError("Failed to upload image");
      } finally {
        setLoading(false);
      }
    } else {
      setError("File size must be less than 1MB");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-[90%] gap-1 py-10">
        <div className="text-left w-full">
          <h1 className="font-poppins font-[500] text-3xl tracking-[-0.5px] text-white">
            Add Profile Picture
          </h1>
        </div>
        <div className="text-left w-full">
          <p className="font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]">
            Your profile picture will be visible on our profile card.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[90%] flex-grow">
        <img
          src={image}
          className="max-w-100 h-60 w-full rounded-lg object-cover border-4 border-[#333333]"
        />
      </div>
      <div className="w-full h-full flex flex-col items-center py-8">
        <button className="flex flex-row w-[90%] items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]" onClick={triggerFileInput}>
        <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileSelect}
    accept="image/*"
    style={{ display: 'none' }}
  />
          Change Picture
        </button>
      </div>
      <div className="w-[90%] h-screen flex flex-col items-center justify-end mb-18 gap-5" onClick={()=>{navigate("/update-preferences")}}>
        <Button text="Next" />
      </div>
    </div>
  );
};

export default UpdatePicture;
