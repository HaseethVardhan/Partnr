import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const UserProfilePage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [refresh, setRefresh] = useState(true);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sections, setSections] = useState([]);

  const handleToggle = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const newConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/new-connection`,
        { userId: searchParams.get("userid") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError("Unknown Error occured. Please try again later.");
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  const acceptConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/accept-connection`,
        { userId: searchParams.get("userid") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError("Unknown Error occured. Please try again later.");
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  const rejectConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/reject-connection`,
        { userId: searchParams.get("userid") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError("Unknown Error occured. Please try again later.");
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  const disconnect = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/disconnect-connection`,
        { userId: searchParams.get("userid") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError("Unknown Error occured. Please try again later.");
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_BASE_URL
          }/user/fetch-user-details-for-profile`,
          { userId: searchParams.get("userid") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const formatDate = (dateStr) => {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            if (isNaN(date)) return dateStr;
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          };

          const userData = [
            {
              key: "about",
              icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/Vector_6_drfg5u.png",
              label: "About me",
              content: (
                <div className="px-7 py-3 overflow-scroll text-white text-sm">
                  {response.data.data.user.about || "No about available."}
                </div>
              ),
            },
            {
              key: "work",
              icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/Vector_7_bgvpgk.png",
              label: "Work Experience",
              content: (
                <div className="px-7 py-3 text-white text-sm">
                  {response.data.data.user.workArray &&
                  response.data.data.user.workArray.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {response.data.data.user.workArray.map((exp, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col w-full rounded-lg p-4 shadow"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-xl font-poppins font-bold text-[#ffffff]">
                              {exp.company.toUpperCase()}
                            </span>
                            <span className="text-base text-white font-[500] font-inter">
                              {exp.role.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#aaaaaa] py-2">
                              {formatDate(exp.from)} to{" "}
                              {exp.to ? formatDate(exp.to) : "Present"}
                            </span>
                            <span className="text-base text-[#ffffff] font-semibold overflow-scroll">
                              {exp.experience}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[#aaaaaa]">
                      No Work Experience Available.
                    </div>
                  )}
                </div>
              ),
            },
            {
              key: "projects",
              icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/Vector_8_g8govl.png",
              label: "Projects",
              content: (
                <div className="px-7 py-3 text-white text-sm">
                  {response.data.data.user.projectsArray &&
                  response.data.data.user.projectsArray.length > 0 ? (
                    <div className="flex flex-col gap-4 w-[90%]">
                      {response.data.data.user.projectsArray.map(
                        (project, idx) => (
                          <div className="flex flex-col gap-1">
                            <span className="text-xl font-poppins font-bold text-[#ffffff]">
                              {project.title}
                            </span>
                            <span className="text-base text-[#ffffff] font-semibold overflow-scroll">
                              {project.details}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-[#aaaaaa]">No Projects Available.</div>
                  )}
                </div>
              ),
            },
            {
              key: "links",
              icon: "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749043298/prime_link_hq2avd.png",
              label: "Links",
              content: (
                <div className="px-7 py-3 text-white text-sm">
                  <div className="flex flex-col gap-4">
                    {response.data.data.user.links ? (
                      <div className="flex flex-col gap-3">
                        {response.data.data.user.links.linkedinlink && (
                          <a
                            href={response.data.data.user.links.linkedInlink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg"
                          >
                            <img
                              src="https://cdn.freebiesupply.com/logos/large/2x/linkedin-icon-1-logo-black-and-white.png"
                              alt="LinkedIn"
                              className="w-6 h-6 brightness-0 invert-100"
                            />
                            <span className="text-white text-base font-inter font-semibold">
                              {response.data.data.user.links.linkedInlink}
                            </span>
                          </a>
                        )}
                        {response.data.data.user.links.xlink && (
                          <a
                            href={response.data.data.user.links.xlink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg"
                          >
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/500px-X_logo_2023_%28white%29.png"
                              alt="X"
                              className="w-6 h-6"
                            />
                            <span className="text-white text-base font-inter font-semibold">
                              {response.data.data.user.links.xlink}
                            </span>
                          </a>
                        )}
                        {response.data.data.user.links.portfoliolink && (
                          <a
                            href={response.data.data.user.links.portfoliolink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg "
                          >
                            <img
                              src="https://img.icons8.com/ios-filled/50/ffffff/domain.png"
                              alt="Portfolio"
                              className="w-6 h-6"
                            />
                            <span className="text-white text-base font-inter font-semibold">
                              {response.data.data.user.links.portfoliolink}
                            </span>
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="text-[#aaaaaa]">No Links Available.</div>
                    )}
                  </div>
                </div>
              ),
            },
          ];
          setError(null);
          setSections(userData);
          setUser(response.data.data.user);
        }
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching user data:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a]">
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
      {error !== null && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 px-10 bg-[#1a1a1a]">
          <p className="text-[#aaaaaa] font-inter font-[500] text-lg">
            {error}
          </p>
        </div>
      )}
      <div className="flex flex-row items-center justify-between px-4 py-10">
        <div className="flex flex-row items-center gap-3">
          <img
            onClick={() => navigate("/")}
            className="h-5 w-6 object-contain"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
          />
          <div className="font-poppins font-[500] text-3xl  text-white">
            {user?.fullname}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center py-5">
          <img
            className="h-30 w-30 rounded-full object-cover"
            src={user?.profilePicture}
          />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div className="font-poppins font-[500] text-2xl text-white">
            {user?.fullname}
          </div>
          <div className="font-poppins font-[500] text-base text-[#aaaaaa]">
            @{user?.username}
          </div>
          <div className="font-poppins font-[500] text-base text-[#aaaaaa] mt-2">
            {user?.profession}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-5 gap-9">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="font-inter font-[500] text-base tracking-[0.5px] text-white">
            {user?.connectionsCount}
          </div>
          <div className="font-inter font-[500] text-sm tracking-[1px] text-[#aaaaaa]">
            Connections
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="font-inter font-[500] text-base tracking-[0.5px] text-white">
            {user?.likesCount}
          </div>
          <div className="font-inter font-[500] text-sm tracking-[1px] text-[#aaaaaa]">
            Likes
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-8 w-full px-5 gap-3">
        {user?.connectionStatus === null && (
          <div
            onClick={newConnection}
            className="flex flex-row items-center justify-center max-w-100 w-full py-3 bg-[#8b5cf6] rounded-lg font-inter font-[500] text-base tracking-[0.5px] text-white"
          >
            Connect
          </div>
        )}
        {user?.connectionStatus === "pending" && (
          <div className="flex flex-row items-center justify-center max-w-100 w-full py-3 border-1 rounded-lg font-inter font-[500] text-base tracking-[0.5px] text-white">
            Pending
          </div>
        )}
        {user?.connectionStatus === "accept" && (
          <>
            <div
              onClick={acceptConnection}
              className="flex flex-row items-center justify-center max-w-50 w-full py-3 bg-[#8b5cf6] rounded-lg font-inter font-[500] text-base tracking-[0.5px] text-white"
            >
              Accept
            </div>
            <div
              onClick={rejectConnection}
              className="flex flex-row items-center justify-center max-w-50 w-full py-3 bg-[#f65c5c] rounded-lg font-inter font-[500] text-base tracking-[0.5px] text-white"
            >
              Reject
            </div>
          </>
        )}
        {user?.connectionStatus === "connected" && (
          <>
            <div
              onClick={disconnect}
              className="flex flex-row items-center justify-center max-w-50 w-full py-3 rounded-lg font-inter border-1 border-[#f65c5c] font-[500] text-base tracking-[0.5px] text-white"
            >
              Disconnect
            </div>
            <div
            onClick={()=>{navigate(`/conversation?userId=${searchParams.get("userid")}`)}}
            className="flex flex-row items-center justify-center max-w-50 w-full py-3 bg-[#333333] rounded-lg font-inter font-[500] text-base tracking-[0.5px] text-white">
              Message
            </div>
          </>
        )}
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
              <div className="max-w-100 w-[90%] mx-auto bg-[#222] rounded-b-lg mb-2">
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

export default UserProfilePage;
