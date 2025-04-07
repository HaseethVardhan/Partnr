import React from "react";
import axios from "axios";
import Button from "../components/Button";

const UpdatePicture = () => {
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
          src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1743434367/default_pfp_wngp1j.jpg"
          alt="Profile"
          className="max-w-100 h-60 w-full rounded-lg object-cover border-4 border-[#333333]"
        />
      </div>
      <div className="w-full h-full flex flex-col items-center py-8">
        <button className="flex flex-row w-[90%] items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]">
          Change Picture
        </button>
      </div>
      <div className="w-[90%] h-screen flex flex-col items-center justify-end mb-18 gap-5">
        <Button text="Next" />
      </div>
    </div>
  );
};

export default UpdatePicture;
