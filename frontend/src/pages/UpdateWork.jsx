import React from "react";
import Button from "../components/Button";

const UpdateWork = () => {

    const [organization, setOrganization] = React.useState("");
    const [role, setRole] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [description, setDescription] = React.useState("");

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-[90%] gap-1 py-10">
        <div className="text-left w-full">
          <h1 className="font-poppins font-[500] text-3xl tracking-[-0.5px] text-white">
            Add your Work
          </h1>
        </div>
        <div className="text-left w-full">
          <p className="font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]">
            Add work experience to enhance your profile.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[90%] gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left">
            Organization Name
          </p>
          <input
            className="flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white"
            type="text"
            placeholder="e.g. Google"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left">
            Role
          </p>
          <input
            className="flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white"
            type="text"
            placeholder="e.g. Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left">
              Start Date
            </p>
            <input
              className="flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <p className="text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left">
              End Date
            </p>
            <input
              className="flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white font-inter font-[500] text-base tracking-[0.5px] px-1 text-left">
            Description
          </p>
          <textarea
            className="flex flex-row w-full bg-[#333333] h-32 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 py-4 text-white"
            placeholder="Describe your work experience..."
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="flex w-full text-[#aaaaaa] text-xs font-inter font-[400] tracking-[0.5px] px-2 justify-end">
            {description?.length || 0}/200
          </p>
        </div>
      </div>
      <div className='w-full h-screen flex flex-col items-center justify-end mb-18 gap-5 mt-5'>
            <button className='flex flex-row w-[90%] items-center justify-center h-12 rounded-lg text-white font-inter font-[500] text-base tracking-[0.5px] border-1 border-[#ffffff5d]'>
                Skip
            </button>
            <Button text="Next" />
        </div>
    </div>
  );
};

export default UpdateWork;
