import React from "react";

const NotificationPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a]">
      <div className="flex flex-row items-center justify-between px-4 py-10">
        <div className="flex flex-row items-center gap-3">
          <img
            className="h-5 w-6 object-contain"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
          />
          <div className="font-poppins font-[500] text-3xl  text-white">
            Notifications
          </div>
        </div>
      </div>
      <div className="flex flex-col px-3">
        <div className="flex flex-row font-inter font-[500] text-sm text-white px-4 mb-3 tracking-[0.5px]">
          Connection Requests
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between h-20">
            <div className="flex flex-row items-center w-[50%]">
              <div className="flex flex-row items-center justify-center w-full h-full">
                <img
                  className="h-15 w-15 rounded-full object-cover"
                  src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp"
                />
              </div>
              <div className="font-inter font-[300] text-xs text-[#f4f4f4] tracking-[0.5px] leading-4.4">
                @alex made a connection request.
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2 w-[50%]">
              <button className="bg-[#8b5cf6] text-white px-2 py-2 rounded-lg  font-inter text-xs tracking-[1.5px] font-[500]">
                Accept
              </button>
              <button className="bg-[#1a1a1a] border-[#ffffffbb] border-[1px] text-[#ffffff] px-2 py-2 rounded-lg font-inter text-xs tracking-[1.5px] font-[500]">
                Delete
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between h-20">
            <div className="flex flex-row items-center w-[50%]">
              <div className="flex flex-row items-center justify-center w-full h-full">
                <img
                  className="h-15 w-15 rounded-full object-cover"
                  src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp"
                />
              </div>
              <div className="font-inter font-[300] text-xs text-[#f4f4f4] tracking-[0.5px] leading-4.4">
                @alex made a connection request.
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2 w-[50%]">
              <button className="bg-[#8b5cf6] text-white px-2 py-2 rounded-lg  font-inter text-xs tracking-[1.5px] font-[500]">
                Accept
              </button>
              <button className="bg-[#1a1a1a] border-[#ffffffbb] border-[1px] text-[#ffffff] px-2 py-2 rounded-lg font-inter text-xs tracking-[1.5px] font-[500]">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row font-inter font-[500] text-sm text-white px-4 mt-6 mb-4 tracking-[0.5px]">
          Likes
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-start h-20">
            <div className="flex flex-row items-center justify-start px-3 w-30">
              <img
                className="h-15 w-15 rounded-full object-cover"
                src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp"
              />
            </div>
            <div className="font-inter font-[300] text-xs text-[#f4f4f4] tracking-[0.5px] leading-4.4 w-full">
              @alex liked your card.
            </div>
            <div className="flex flex-row items-center justify-end px-2">
              <img
                className="h-[45px] w-[45px] object-contain"
                src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748710879/iconamoon_heart-light_jililb.png"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-start h-20">
            <div className="flex flex-row items-center justify-start px-3 w-30">
              <img
                className="h-15 w-15 rounded-full object-cover"
                src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp"
              />
            </div>
            <div className="font-inter font-[300] text-xs text-[#f4f4f4] tracking-[0.5px] leading-4.4 w-full">
              @alex liked your card.
            </div>
            <div className="flex flex-row items-center justify-end px-2">
              <img
                className="h-[45px] w-[45px] object-contain"
                src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748710879/iconamoon_heart-light_jililb.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
