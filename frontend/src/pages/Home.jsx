import React, { useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { cards, setCards, shouldRefetch, setShouldRefetch, tempExcludedIds } =
    useContext(UserDataContext);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/suggested-users`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const fetchedUsers = response.data.data.users || [];

        if (fetchedUsers.length > 0) {
          const filteredUsers = fetchedUsers.filter(
            (user) => !tempExcludedIds.includes(user._id)
          );
          setCards((prev) => [...prev, ...filteredUsers]);
          setError(null);
        } else if (cards.length === 0) {
          setError(
            "No relevant users found. Please change your preferences or try again later."
          );
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
        setShouldRefetch(false); // disable refetch until explicitly needed
      }
    };

    if ((cards.length < 3 && shouldRefetch) || cards.length === 0) {
      fetchCards();
    }
  }, [cards, shouldRefetch]);

  return (
    <div className="flex flex-col relative h-screen">
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
      <div className="flex flex-row items-center justify-between px-6 mt-6">
        <div className="font-poppins font-[700] text-3xl text-white">
          Partnr
        </div>
        <div
          onClick={() => {
            navigate("/update-preferences");
          }}
          className="z-999"
        >
          <img src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748694120/Vector_1_qwnwxs.png" />
        </div>
      </div>
      <div className="flex flex-col h-[75%] w-full items-center justify-between">
        <div className="grid h-full w-[80%] place-content-center">
          {cards.map((card) => {
            return (
              <ProfileCard
                key={card._id}
                cards={cards}
                setCards={setCards}
                {...card}
              />
            );
          })}
        </div>
      </div>
      <BottomNavbar current="home" />
    </div>
  );
};

export default Home;
