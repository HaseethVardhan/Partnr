import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const MessagesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const [originalConversations, setOriginalConversations] = useState([]);

  const {user} = useContext(UserDataContext)
  const currentUserId = user._id;


  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/message/fetch-conversations`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setConversations(response.data.data);
        setOriginalConversations(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const filteredConversations = search.trim()
    ? [...conversations].filter((conv) => {
        const otherUser = conv.participants.find(
          (user) => user._id !== currentUserId
        );
        const fullName =
          otherUser?.fullname?.firstname.toLowerCase() +
          " " +
          otherUser?.fullname?.lastname.toLowerCase();
        return fullName.includes(search.trim().toLowerCase());
      })
    : originalConversations;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between px-4 py-10">
        <div className="flex flex-row items-center gap-3">
          <img
            onClick={() => {
              navigate("/");
            }}
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
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search Messages"
            className="font-inter font-[400] text-lg tracking-[0.5px] text-[#aaaaaa] focus:outline-none"
          />
        </div>
      </div>
      {/* <div className="flex flex-row items-center justify-center w-full px-5 py-3 gap-2">
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
          <img
            className="h-4 w-4 object-cover"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1749285716/mail-add-01_njiiam.png"
          />
        </div>
      </div> */}
      <div className="flex flex-col px-5 py-4 gap-5">
        {filteredConversations?.length === 0 && (
          <p className="font-inter text-[#aaaaaa] justify-between items-center">
            No results found.
          </p>
        )}
        {/* {conversations?.map((conv, idx) => (
          <div
            key={idx}
            onClick={() => {
              navigate(`/conversation?userId=${conv.otherUser._id}`);
            }}
            className="flex flex-row items-center"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <div className="flex flex-row items-center justify-start w-[20%]">
              <img
                className="h-13 w-13 rounded-full object-cover"
                src={conv.otherUser.profilePicture}
              />
            </div>
            <div className="flex flex-col items-start justify-between py-2 w-[80%] overflow-hidden">
              <div className="flex flex-row items-center justify-start w-full gap-1">
                <div className="font-inter font-[500] text-base tracking-[0.5px] text-white truncate max-w-[60%]">
                  {conv.otherUser.fullname.firstname.charAt(0).toUpperCase() +
                    conv.otherUser.fullname.firstname.slice(1).toLowerCase() +
                    " " +
                    conv.otherUser.fullname.lastname.charAt(0).toUpperCase() +
                    conv.otherUser.fullname.lastname.slice(1).toLowerCase()}
                </div>
                <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383] truncate max-w-[40%]">
                  {(() => {
                    const createdAt = new Date(conv.latestChat.createdAt);
                    const now = new Date();
                    const diffMs = now - createdAt;
                    const diffSec = Math.floor(diffMs / 1000);
                    const diffMin = Math.floor(diffSec / 60);
                    const diffHr = Math.floor(diffMin / 60);
                    const diffDay = Math.floor(diffHr / 24);

                    if (diffMin < 1) return "now";
                    if (diffMin < 60) return `${diffMin}m`;
                    if (diffHr < 24) return `${diffHr}h`;
                    return `${diffDay}d`;
                  })()}
                </div>
              </div>
              <div className="font-inter font-[300] text-sm tracking-[1px] text-[#f4f4f4] truncate w-full">
                {conv.latestChat.text}
              </div>
            </div>
          </div>
        ))} */}
        {filteredConversations.map((conv, idx) => {
          const otherUser = conv.otherUser

          const createdAt = new Date(conv.lastMessage?.createdAt || conv.updatedAt);
          const now = new Date();
          const diffMs = now - createdAt;
          const diffMin = Math.floor(diffMs / (1000 * 60));
          const diffHr = Math.floor(diffMin / 60);
          const diffDay = Math.floor(diffHr / 24);

          let timeDisplay = "now";
          if (diffMin >= 1 && diffMin < 60) timeDisplay = `${diffMin}m`;
          else if (diffHr < 24) timeDisplay = `${diffHr}h`;
          else if (diffDay >= 1) timeDisplay = `${diffDay}d`;

          return (
            <div
              key={idx}
              onClick={() => navigate(`/conversation?conv=${conv.conversationId}`)}
              className="flex flex-row items-center cursor-pointer"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <div className="flex flex-row items-center justify-start w-[20%]">
                <img
                  className="h-13 w-13 rounded-full object-cover"
                  src={otherUser?.profilePicture}
                  alt="Profile"
                />
              </div>
              <div className="flex flex-col items-start justify-between py-2 w-[80%] overflow-hidden">
                <div className="flex flex-row items-center justify-start w-full gap-1">
                  <div className="font-inter font-[500] text-base tracking-[0.5px] text-white truncate max-w-[60%]">
                    {otherUser?.fullname?.firstname.charAt(0).toUpperCase() +
                      otherUser?.fullname?.firstname.slice(1).toLowerCase() +
                      " " +
                      otherUser?.fullname?.lastname.charAt(0).toUpperCase() +
                      otherUser?.fullname?.lastname.slice(1).toLowerCase()}
                  </div>
                  <div className="font-inter font-[400] text-sm tracking-[1px] text-[#838383] truncate max-w-[40%]">
                    {timeDisplay}
                  </div>
                </div>
                <div className="font-inter font-[300] text-sm tracking-[1px] text-[#f4f4f4] truncate w-full">
                  {conv.lastMessage?.text || ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesPage;
