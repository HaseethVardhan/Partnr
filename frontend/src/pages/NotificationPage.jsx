import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

const NotificationPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [connectionNotifications, setConnectionNotifications] = useState([]);
  const [likeNotifications, setLikeNotifications] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_BASE_URL
          }/user/fetch-notifications`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setConnectionNotifications(
          response.data.data.connectionNotifications || []
        );
        setLikeNotifications(response.data.data.likeNotifications || []);
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const acceptConnection = async (userId, idx) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/accept-connection`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );1
      setConnectionNotifications((prev) =>
        prev.filter((_, i) => i !== idx)
      );
    } catch (error) {
      console.log(error);
      setError("Unknown Error occured. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const rejectConnection = async (userId, idx) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/reject-connection`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setConnectionNotifications((prev) =>
        prev.filter((_, i) => i !== idx)
      );
    } catch (error) {
      console.log(error);
      setError("Unknown Error occured. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 px-10 ">
          <p className="text-[#aaaaaa] font-inter font-[500] text-lg">
            {error}
          </p>
        </div>
      )}
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
            Notifications
          </div>
        </div>
      </div>
      <div className="flex flex-col px-3">
        <div className="flex flex-row font-inter font-[500] text-sm text-white px-4 mb-3 tracking-[0.5px]">
          Connection Requests
        </div>
        <div className="flex flex-col">
          {connectionNotifications.length === 0 ? (
            <div className="text-[#aaaaaa] font-inter font-[400] text-sm px-4 py-2">
              No connection requests.
            </div>
          ) : (
            connectionNotifications.map((notification, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center justify-between h-20"
              >
                <div
                onClick={()=>{navigate(`/user-profile?userid=${notification.user._id}`)}}
                className="flex flex-row items-center w-[50%]">
                  <div className="flex flex-row items-center justify-center w-full h-full">
                    <img
                      className="h-15 w-15 rounded-full object-cover"
                      src={notification.user.profilePicture}
                    />
                  </div>
                  <div className="font-inter font-[300] text-xs text-[#f4f4f4] tracking-[0.5px] leading-4.4">
                    @{notification.user.username} made a connection request.
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-2 w-[50%]">
                  <button
                    onClick={() => {
                      acceptConnection(notification.user._id, idx);
                    }}
                    className="bg-[#8b5cf6] text-white px-2 py-2 rounded-lg  font-inter text-xs tracking-[1.5px] font-[500]"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      rejectConnection(notification.user._id, idx);
                    }}
                    className="bg-[#1a1a1a] border-[#ffffffbb] border-[1px] text-[#ffffff] px-2 py-2 rounded-lg font-inter text-xs tracking-[1.5px] font-[500]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-row font-inter font-[500] text-sm text-white px-4 mt-6 mb-4 tracking-[0.5px]">
          Likes
        </div>
        <div className="flex flex-col">
          {likeNotifications.length === 0 ? (
            <div className="text-[#aaaaaa] font-inter font-[400] text-sm px-4 py-2">
              No latest likes.
            </div>
          ) : (
            likeNotifications.map((notification, idx) => (
              <div
              onClick={()=>{navigate(`/user-profile?userid=${notification.user._id}`)}}
              key={idx} className="flex flex-row items-center justify-start h-20">
                <div className="flex flex-row items-center justify-start px-3 w-30">
                  <img
                    className="h-15 w-15 rounded-full object-cover"
                    src={notification.user.profilePicture}
                  />
                </div>
                <div className="font-inter font-[300] text-xs text-[#f4f4f4] tracking-[0.5px] leading-4.4 w-full">
                  @{notification.user.username} liked your card.
                </div>
                <div className="flex flex-row items-center justify-end px-2">
                  <img
                    className="h-[45px] w-[45px] object-contain"
                    src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748710879/iconamoon_heart-light_jililb.png"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
