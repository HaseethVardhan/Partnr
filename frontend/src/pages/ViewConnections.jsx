import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { useNavigate } from "react-router-dom";

const ViewConnections = () => {
  const [loading, setLoading] = useState();
  const [connections, setConnections] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchConnections = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/view-connections`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setConnections(response.data.data.connections);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, []);

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
      <div className="flex flex-row items-center gap-3 py-6 px-3">
        <img
          onClick={() => navigate(-1)}
          className="h-5 w-6 object-contain"
          src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
        />
        <div className="font-poppins font-[500] text-3xl  text-white">
          Connections
        </div>
      </div>
      <div className="flex flex-col px-2">
          {connections.length === 0 ? (
            <div className="text-[#aaaaaa] font-inter font-[400] text-sm px-4 py-2">
              No Connections.
            </div>
          ) : (
            connections.map((con, idx) => (
              <div
              onClick={()=>{navigate(`/user-profile?userid=${con._id}`)}}
              key={idx} className="flex flex-row items-center justify-start h-20">
                <div className="flex flex-row items-center justify-start px-3 w-30">
                  <img
                    className="h-15 w-15 rounded-full object-cover"
                    src={con.profilePicture}
                  />
                </div>
                <div className="font-inter font-[300] text-sm text-[#f4f4f4] tracking-[0.5px] leading-4.4 w-full">
                  @{con.username}
                </div>
              </div>
            ))
          )}
        </div>
    </div>
  );
};

export default ViewConnections;
