import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { UserDataContext } from "../context/UserContext";

const UpdateUsername = () => {
  const { user, setuser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const handleCreateUsername = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!username) {
      setError("Please fill all the fields.");
    } else if (username.length < 6) {
      setError("Username must be at least 6 characters long.");
    } else if (username.length > 20) {
      setError("Username must be at most 20 characters long.");
    } else if (/[^a-zA-Z0-9_]/.test(username)) {
      setError("Username can only contain a-z, A-Z, 0-9 and _.");
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/isUserNameAvailable`,
        {
          username,
        }
      );

      if (response.status >= 400) {
        setError(response.data.message);
      } else {
        setError("");
        setuser({
          ...user,
          username: username,
        });
        navigate('/update-name');
      }
    }

    setLoading(false);
  };
  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-[90%] gap-1 py-10">
        <div className="text-left w-full">
          <h1 className="font-poppins font-[500] text-3xl tracking-[-0.5px] text-white">
            Create Username
          </h1>
        </div>
        <div className="text-left w-full">
          <p className="font-inter font-[400] text-[#b3b3b3] text-base tracking-[0.5px]">
            Pick a name others can find you by.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[90%] gap-2">
        <input
          className="flex flex-row w-full bg-[#333333] h-14 rounded-xl placeholder-[#aaaaaa] font-inter font-[400] text-sm px-6 text-white"
          type="text"
          placeholder="e.g @username123"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {error && (
          <p className="flex w-full text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2">
            {error}
          </p>
        )}
      </div>
      <div
        className="w-[90%] h-screen flex flex-col items-center justify-end mb-18"
        onClick={(e) => {
          handleCreateUsername(e);
        }}
      >
        <Button text="Next" />
      </div>
    </div>
  );
};

export default UpdateUsername;
