import React, { useContext, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {user, setuser} = useContext(UserDataContext)

  useEffect(() => {
    if (!token || token === null) {
      navigate("/authentication");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/user/getProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setuser(response.data.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          navigate("/authentication");
        });
    }
  }, [token, navigate, setuser]);

  return <>{children}</>;
};

export default UserProtectedWrapper;
