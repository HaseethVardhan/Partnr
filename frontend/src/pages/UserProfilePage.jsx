import React, { useState } from "react";

const sections = [
    {
        key: "about",
        icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/Vector_6_drfg5u.png",
        label: "About me",
        content: (
            <div className="px-7 py-3 text-white text-sm">
                This is the About me section content.
            </div>
        ),
    },
    {
        key: "work",
        icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/Vector_7_bgvpgk.png",
        label: "Work Experience",
        content: (
            <div className="px-7 py-3 text-white text-sm">
                This is the Work Experience section content.
            </div>
        ),
    },
    {
        key: "projects",
        icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/Vector_8_g8govl.png",
        label: "Projects",
        content: (
            <div className="px-7 py-3 text-white text-sm">
                This is the Projects section content.
            </div>
        ),
    },
    {
        key: "links",
        icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/prime_link_hq2avd.png",
        label: "Links",
        content: (
            <div className="px-7 py-3 text-white text-sm">
                This is the Links section content.
            </div>
        ),
    },
];

const UserProfilePage = () => {
   const [openSection, setOpenSection] = useState(null);
  
      const handleToggle = (key) => {
          setOpenSection(openSection === key ? null : key);
      };
  
      return (
          <div className="flex flex-col h-screen bg-[#1a1a1a]">
              <div className="flex flex-row items-center justify-between px-4 py-10">
                  <div className="flex flex-row items-center gap-3">
                      <img
                          className="h-5 w-6 object-contain"
                          src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
                      />
                      <div className="font-poppins font-[500] text-3xl  text-white">
                          James
                      </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 px-2">
                      <img
                          className="h-7 w-6 object-contain"
                          src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781439/Group_dpokwd.png"
                      />
                  </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center py-5">
                      <img
                          className="h-30 w-30 rounded-full object-cover"
                          src="https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp"
                      />
                  </div>
                  <div className="flex flex-col items-center justify-center ">
                      <div className="font-poppins font-[500] text-2xl text-white">
                          James
                      </div>
                      <div className="font-poppins font-[500] text-base text-[#aaaaaa]">
                          @p.james
                      </div>
                  </div>
              </div>
              <div className="flex flex-row items-center justify-center mt-8 gap-9">
                  <div className="flex flex-col items-center justify-center gap-1">
                      <div className="font-inter font-[500] text-base tracking-[0.5px] text-white">
                          350
                      </div>
                      <div className="font-inter font-[500] text-sm tracking-[1px] text-[#aaaaaa]">
                          Connections
                      </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                      <div className="font-inter font-[500] text-base tracking-[0.5px] text-white">
                          250
                      </div>
                      <div className="font-inter font-[500] text-sm tracking-[1px] text-[#aaaaaa]">
                          Kudos
                      </div>
                  </div>
              </div>
              <div className="flex flex-row items-center justify-center mt-8 max-w-100 px-5 gap-3">
                  <div className="flex flex-row items-center justify-center w-full py-3 bg-[#8b5cf6] rounded-lg font-inter font-[500] text-base tracking-[0.5px] text-white">
                      Connect
                  </div>
                  <div className="flex flex-row items-center justify-center w-full py-3 bg-[#333333] rounded-lg font-inter font-[500] text-base tracking-[0.5px] text-white">
                      Message
                  </div>
              </div>
              <div className="flex flex-col align- items-center justify-center gap-3 mt-8">
                  {sections.map((section) => (
                      <React.Fragment key={section.key}>
                          <div
                              className="flex flex-row align- items-center justify-between px-5 max-w-100 w-[90%] py-5 bg-[#333333] rounded-lg font-inter font-[500] text-sm tracking-[1px] text-white cursor-pointer"
                              onClick={() => handleToggle(section.key)}
                          >
                              <div className="flex flex-row items-center gap-3">
                                  <img
                                      className={`object-contain ${
                                          section.key === "links" ? "w-5 h-5" : "w-4 h-4"
                                      }`}
                                      src={section.icon}
                                  />
                                  <div>{section.label}</div>
                              </div>
                              <div>
                                  <img
                                      className={`h-2 transition-transform duration-200 ${
                                          openSection === section.key ? "rotate-180" : ""
                                      }`}
                                      src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043299/Vector_9_ixz15f.png"
                                  />
                              </div>
                          </div>
                          {openSection === section.key && (
                              <div className="w-[90%] mx-auto bg-[#222] rounded-b-lg mb-2">
                                  {section.content}
                              </div>
                          )}
                      </React.Fragment>
                  ))}
              </div>
              {/* <BottomNavbar current='profile' /> */}
          </div>
      );
};


export default UserProfilePage