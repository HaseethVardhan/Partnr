import React from "react";
import Button from "../components/Button";

const UpdateProject = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center">
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
      </div>
      <div className="w-full h-screen flex flex-col items-center justify-end mb-18 gap-5">
        <button className="flex flex-row w-[90%] items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]">
          Skip
        </button>
        <Button text="Next" />
      </div>
    </div>
  );
};

export default UpdateProject;
