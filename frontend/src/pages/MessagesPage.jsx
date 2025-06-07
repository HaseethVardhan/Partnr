import React from "react";

const MessagesPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between px-4 py-10">
        <div className="flex flex-row items-center gap-3">
          <img
            className="h-5 w-6 object-contain"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
          />
          <div className="font-poppins font-[500] text-3xl  text-white">
            Messages
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 px-2">
          <img
            className="h-7 w-6 object-contain"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781439/Group_dpokwd.png"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full px-5 py-2">
        <div className="flex flex-row items-center justify-start gap-3 bg-[#333333] py-3 w-full px-4 rounded-sm">
            <img
                className="h-5 w-5 object-cover"
                src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749284397/search-01_ljxoiu.png"
            />
            <input type="text" placeholder="Search Messages" className="font-inter font-[400] text-lg tracking-[0.5px] text-[#aaaaaa]" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full px-5 py-3 gap-2">
        <div className="flex flex-row items-center justify-center w-1/4 bg-[#333333] py-3 px-2 rounded-lg font-inter font-[400] text-xs tracking-[0.5px] text-white">
            All
        </div>
        <div className="flex flex-row items-center justify-center w-1/4 bg-[#333333] py-3 px-2 rounded-lg font-inter font-[400] text-xs tracking-[0.5px] text-white">
            Unread
        </div>
        <div className="flex flex-row items-center justify-center w-1/4 bg-[#333333] py-3 px-2 rounded-lg font-inter font-[400] text-xs tracking-[0.5px] text-white">
            Archived
        </div>
        <div className="flex flex-row items-center justify-center w-1/4 bg-[#333333] py-3 px-2 rounded-lg font-inter font-[400] text-xs tracking-[0.5px] text-white">
            <img className="h-4 w-4 object-cover" src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749285716/mail-add-01_njiiam.png" />
        </div>
      </div>
      <div className="flex flex-col px-5 py-4 gap-5">
        <div className="flex flex-row items-center">
            <div className="flex flex-row items-center justify-start w-[20%]">
                <img className="h-13 w-13 rounded-full object-cover" src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp" />
            </div>
            <div className="flex flex-col items-start justify-between py-2 w-[80%]">
                <div className="flex flex-row items-center justify-start w-full gap-1">
                    <div className="font-inter font-[500] text-base tracking-[0.5px] text-white">Adrian</div>
                    <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383]">@uiuxadrian•</div>
                    <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383]">Now</div>
                </div>
                <div className="font-inter font-[300] text-sm tracking-[1px] text-[#f4f4f4]">
                    Sent a link!
                </div>
            </div>
        </div>
        <div className="flex flex-row items-center">
            <div className="flex flex-row items-center justify-start w-[20%]">
                <img className="h-13 w-13 rounded-full object-cover" src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp" />
            </div>
            <div className="flex flex-col items-start justify-between py-2 w-[80%]">
                <div className="flex flex-row items-center justify-start w-full gap-1">
                    <div className="font-inter font-[500] text-base tracking-[0.5px] text-white">Adrian</div>
                    <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383]">@uiuxadrian•</div>
                    <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383]">Now</div>
                </div>
                <div className="font-inter font-[300] text-sm tracking-[1px] text-[#f4f4f4]">
                    Sent a link!
                </div>
            </div>
        </div>
        <div className="flex flex-row items-center">
            <div className="flex flex-row items-center justify-start w-[20%]">
                <img className="h-13 w-13 rounded-full object-cover" src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp" />
            </div>
            <div className="flex flex-col items-start justify-between py-2 w-[80%]">
                <div className="flex flex-row items-center justify-start w-full gap-1">
                    <div className="font-inter font-[500] text-base tracking-[0.5px] text-white">Adrian</div>
                    <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383]">@uiuxadrian•</div>
                    <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383]">Now</div>
                </div>
                <div className="font-inter font-[300] text-sm tracking-[1px] text-[#f4f4f4]">
                    Sent a link!
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
