import React, { useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {SocketContext} from '../context/SocketContext'

const Home = () => {
  const {socket} = useContext(SocketContext)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const [limit, setLimit] = useState(5);

  // const [cards, setCards] = useState([]);
  const { cards, setCards } = useContext(UserDataContext);
  let reload = cards.length > 0 ? false: true;

  useEffect(() => {
    setLoading(true);
    if (cards.length < limit && reload) {
      const fetchCards = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/suggested-users`,{},{
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });
          if(response.status === 201){
            if(response.data.data.users.length < 5){
              setLimit(0);
            }
            setCards((prevCards) => [...prevCards, ...response.data.data.users]);
            setError(null);
            setLoading(false)
            
          }else{

            setLimit(0);
            setError("No relevant users found. Please change your preferences or try again later.");
            setLoading(false)
          }
        } catch (error) {
          console.error("Error fetching cards:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      fetchCards();
      }else{
        setLoading(false);
      }
      if(cards.length === 0){
          setError("No relevant users found. Please change your preferences or try again later.");
          setLoading(false)
      }
      
  }, [cards]);  

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
          <p className="text-[#aaaaaa] font-inter font-[500] text-lg">{error}</p>
        </div>
      )}
      <div className="flex flex-row items-center justify-between px-6 py-10">
        <div className="font-poppins font-[700] text-3xl text-white">
          Partnr
        </div>
        <div
        onClick={()=>{navigate('/update-preferences')}} 
        className="z-999"
        >
          <img src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748694120/Vector_1_qwnwxs.png" />
        </div>
      </div>
      <div className="grid h-[500px] py-6 w-full place-items-center">
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
      <BottomNavbar current="home" />
    </div>
  );
};
   
export default Home;
 