import React, {useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext"

const SettingsPage = () => {
  const navigate = useNavigate();
  const {setuser} = useContext(UserDataContext)
  const {socket} = useContext(SocketContext)

    const logout = () => {
        localStorage.clear();
        setuser({})
        if (socket) {
            socket.disconnect();
        }
        navigate("/authentication");
    }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between px-4 py-10">
        <div className="flex flex-row items-center gap-3">
          <img
            onClick={() => {
              navigate(-1);
            }}
            className="h-5 w-6 object-contain"
            src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
          />
          <div className="font-poppins font-[500] text-3xl  text-white">
            Settings
          </div>
        </div>
      </div>
    <div className="flex flex-col gap-6 px-4">
        <button
            onClick={()=>{logout()}}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded shadow"
        >
            Logout
        </button>
        <Link to='https://x.com/haseethvardhan'>
        <button
            
            className="bg-[#333333] w-full hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded shadow"
            >
            About Developer
        </button>
        </Link>
    </div>
    </div>
  );
};

export default SettingsPage;
