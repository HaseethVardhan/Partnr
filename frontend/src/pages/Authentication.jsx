import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

const Authentication = () => {
  const navigate = useNavigate();

  const { user, setuser } = useContext(UserDataContext);

  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (user._id) {
      navigate("/");
    }
  }, []);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const isStrongPassword = (str) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(str);
  };

  const validateEmail = (mail) => {
    if (mail.match(isValidEmail)) {
      return true;
    } else {
      return false;
    }
  };

  const googleAuth = async () => {
    setLoading(true);
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
    setLoading(false);
  };

  const githubAuth = async () => {
    setLoading(true);
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/github`, "_self");
    setLoading(false);
  };

  const handleLogIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/login`,
          {
            email,
            password,
          }
        );

        if (response.status >= 400) {
          setError(response.data.message);
        } else {
          setError("");
          setuser(response.data.data.user);
          localStorage.setItem("token", response.data.data.token);
          navigate("/");
        }
      } catch (error) {
        setError(error.response.data.message);
      }

      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else if (password.length < 8) {
      setError(
        "Password must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char."
      );
    } else if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char."
      );
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/isMailExists`,
          {
            email,
          }
        );

        if (response.status >= 400) {
          setError(response.data.message);
        } else {
          setError("");
          setuser({
            email: email,
            password: password,
            authtype: "local",
          });
          navigate("/update-username");
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-screen bg-[#1a1a1a] select-none">
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
      <div className="mt-10">
        <img
          src={import.meta.env.VITE_app_logo}
          className="w-11 h-11 rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-center py-6 w-[90%]">
        {!login ? (
          <>
            <p className="text-white font-poppins font-semibold text-3xl py-2">
              Sign up Account
            </p>
            <p className="text-[#aaaaaa] font-inter font-[400] text-base tracking-[0.8px] text-center">
              Enter information to create your account
            </p>
          </>
        ) : (
          <>
            <p className="text-white font-poppins font-semibold text-3xl py-2">
              Log in Account
            </p>
            <p className="text-[#aaaaaa] font-inter font-[400] text-base tracking-[0.8px] text-center">
              Enter your credentials to access your account
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 text-white font-inter font-[400] text-base w-full tracking-[0.8px] py-4">
        <button
          className="flex flex-row w-[90%] bg-[#333333] h-10 rounded-lg gap-3 items-center justify-center"
          onClick={googleAuth}
        >
          <div className="flex items-center justify-end ">
            <img
              className="w-4 "
              src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
            />
          </div>
          <div className="flex items-center justify-center">
            Continue with Google
          </div>
        </button>
        <button
          className="flex flex-row w-[90%] bg-[#333333] h-10 rounded-lg gap-3 items-center justify-center"
          onClick={githubAuth}
        >
          <div className="flex items-center justify-end ">
            <img
              className="w-6 mix-blend-lighten"
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
            />
          </div>
          <div className="flex items-center justify-center">
            Continue with Github
          </div>
        </button>
      </div>
      <div className="flex items-center w-[90%] py-6">
        <div
          className="flex-1"
          style={{ borderTop: "0.1px solid rgba(244, 244, 244, 0.2)" }}
        ></div>
        <span className="mx-4 text-[#aaaaaa] font-inter font-[400] text-sm">
          or continue with email
        </span>
        <div
          className="flex-1"
          style={{ borderTop: "0.1px solid rgba(244, 244, 244, 0.2)" }}
        ></div>
      </div>
      <div className="flex flex-col items-center gap-3 w-full tracking-[0.5px] py-1">
        <div className="flex text-white text-left w-[88%] font-inter font-[400] text-base">
          Email
        </div>
        <input
          className="flex flex-row w-[90%] text-white bg-[#333333] h-9 rounded-lg gap-3 placeholder-[#b3b3b3] font-inter font-[400] text-sm px-2 select-all"
          type="email"
          placeholder="you@youremail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-3 w-full tracking-[0.5px] py-3 mb-3">
        <div className="flex text-white text-left w-[88%] font-inter font-[400] text-base">
          Password
        </div>
        <input
          className="flex flex-row w-[90%] text-white bg-[#333333] h-9 rounded-lg gap-3 placeholder-[#b3b3b3] font-inter font-[400] text-sm px-2 select-all"
          type="password"
          placeholder="At least 8 characters."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error && (
          <p className="flex w-[90%] text-[#ff857f] text-[11px] font-inter font-[400] tracking-[0.5px] px-2">
            {error}
          </p>
        )}
      </div>
      {login ? (
        <div
          className="w-[90%] flex flex-col items-center"
          onClick={(e) => {
            handleLogIn(e);
          }}
        >
          <Button text="Log In" />
        </div>
      ) : (
        <div
          className="w-[90%] flex flex-col items-center"
          onClick={(e) => {
            handleCreateAccount(e);
          }}
        >
          <Button text="Create Account" />
        </div>
      )}
      <div className="flex flex-col items-center text-center w-full py-6">
        <p className="font-inter font-[500] text-xs tracking-[0.5px] w-[90%] text-[#aaaaaa]">
          By Clicking “Create Account” you agree to our code of conduct, terms
          of Service and privacy Policy.
        </p>
      </div>
      <div className="flex flex-row items-center text-center w-full py-2 font-inter font-[400] text-sm tracking-[0.1px] text-[#aaaaaa]">
        <p className="flex flex-row items-center justify-center w-full">
          {!login ? (
            <>
              <span>Already have an account?</span>&nbsp;
              <span
                className="text-white font-[500]"
                onClick={() => setLogin(!login)}
              >
                Log In
              </span>
            </>
          ) : (
            <>
              <span>Don't have an account yet?</span>&nbsp;
              <span
                className="text-white font-[500]"
                onClick={() => setLogin(!login)}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Authentication;
