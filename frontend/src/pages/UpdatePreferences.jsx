import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { UserDataContext } from "../context/UserContext";

const UpdatePreferences = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setCards, setShouldRefetch } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const fetchUserPreferences = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/get-preferences`,{},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        if (res.data && Array.isArray(res.data.data.preferences)) {
          setSelectedPreferences(res.data.data.preferences.slice(0, 3)); // ensure max 3
        }
      } catch (err) {
        console.error("Failed to fetch preferences:", err);
      } finally {
        setLoading(false)
      }
    };

    fetchUserPreferences();
  }, []);

  const preferences = [
    "Artificial Intelligence",
    "Graphic Design",
    "Backend Development",
    "Web3",
    "Machine Learning",
    "Cybersecurity",
    "Mobile App Development",
    "DevOps",
    "Cloud Computing",
    "UI/UX Design",
    "Data Science",
    "Web Development",
    "Frontend Development",
    "Game Development",
  ];

  const [selectedPreferences, setSelectedPreferences] = React.useState([]);

  const handlePreferenceSelect = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((s) => s !== preference)
      );
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
      setCards([]); // clear old cards
      setShouldRefetch(true);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center backdrop-blur-3xl justify-center z-50">
          <Trefoil
            size="40"
            stroke="4"
            strokeLength="0.15"
            bgOpacity="0.3"
            speed="1.4"
            color="#8b5cf6"
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-[90%] gap-1 py-10">
        <div className="text-left w-full">
          <h1 className="font-poppins font-[500] text-3xl tracking-[-0.5px] text-white">
            Update Preferences
          </h1>
        </div>
        <div className="text-left w-full">
          <p className="font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]">
            This helps us to match you with the right people. Choose upto 3
            skills.
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2 w-[90%] justify-start">
        {preferences.map((preference) => (
          <div
            key={preference}
            onClick={() => handlePreferenceSelect(preference)}
            className={`h-9 cursor-pointer font-inter font-[500] text-sm tracking-[0.5px] flex items-center justify-center text-center px-5 rounded-xl ${
              selectedPreferences.includes(preference)
                ? "bg-[#a27df8] text-white"
                : "bg-[#333333] text-[#b3b3b3]"
            }`}
          >
            {preference}
          </div>
        ))}
      </div>
      <div className="w-[90%] h-screen flex flex-col items-center justify-end mb-18 gap-5">
        <div
          className="w-full"
          onClick={() => {
            handleSave();
          }}
        >
          <Button text="Save" />
        </div>
      </div>
    </div>
  );
};

export default UpdatePreferences;
