import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { UserDataContext } from "../context/UserContext";

const ProfileCard = ({
  _id,
  setCards,
  cards,
  fullname,
  profession,
  skills,
  profilePicture,
}) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0.7, 1, 0.7]);
  const rotate = rotateRaw;

  const { tempExcludedIds, setTempExcludedIds } = useContext(UserDataContext);


  const isFront = _id === cards[cards.length - 1]?._id;

  const animateSwipeRight = () => {
    x.stop();
    x.set(0);
    animate(x, 200, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onUpdate: (latest) => {
        if (latest > 100) {
          x.stop();
          swipedRight();
        }
      },
    });
  };

  const handleDragEnd = () => {
    if (x.get() > 80) {
      swipedRight();
    } else if (x.get() < -80) {
      swipedLeft();
    }
  };

  const swipedRight = async () => {
    setCards((pv) => pv.filter((v) => v._id !== _id));
    setTempExcludedIds((prev) => [...prev, _id]);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/swipe-right`,
        { userId: _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
    } catch (error) {
      console.log(error);
    } finally {
      setTempExcludedIds((prev) => prev.filter((id) => id !== _id));
    }
  };

  const swipedLeft = async () => {
    setCards((pv) => pv.filter((v) => v._id !== _id));
    setTempExcludedIds((prev) => [...prev, _id]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/swipe-left`,
        { userId: _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    } catch (error) {
      console.log(error);
    } finally {
      setTempExcludedIds((prev) => prev.filter((id) => id !== _id));
    }
  };

  // const bookmark = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post(
  //           `${
  //             import.meta.env.VITE_BASE_URL
  //           }/user/bookmark`,
  //           { userId: _id },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //           }
  //         );
  //         console.log(response.data)
  //     } catch (error) {
  //       console.log(error)
  //       setError("Unknown Error occured. Please try again later.")
  //     }finally{
  //       setLoading(false);
  //     }
  //   }

  return (
    <motion.div
      className="max-h-[70vh] max-w-[280px] w-auto sm:max-w-[800px] lg:max-w-[1000px] aspect-[2/3] origin-bottom rounded-lg bg-[#333333] hover:cursor-grab active:cursor-grabbing px-3"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
        zIndex: isFront ? 1 : 0,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <Link to={`/user-profile?userid=${_id}`}>
        <div className="aspect-[5/4] w-full mt-3">
          <img
            src={profilePicture}
            alt="Placeholder alt"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-row items-center justify-between px-1 py-2">
          <div className="flex flex-col items-start justify-between w-[50%]">
            <div className="font-inter font-[500] text-sm text-[#aaaaaa]">
              Name
            </div>
            <div className="font-inter font-[600] text-base text-white">{`${
              fullname.firstname.charAt(0).toUpperCase() +
              fullname.firstname.slice(1).toLowerCase()
            } ${
              fullname.lastname.charAt(0).toUpperCase() +
              fullname.lastname.slice(1).toLowerCase()
            }`}</div>
          </div>
          <div className="flex flex-col items-end justify-between w-[50%]">
            <div className="font-inter font-[500] text-sm text-[#aaaaaa]">
              Profession
            </div>
            <div className="font-inter font-[600] text-base text-white">{`${
              profession.charAt(0).toUpperCase() +
              profession.slice(1).toLowerCase()
            }`}</div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 justify-between px-1 max-h-[100px] overflow-y-auto pr-1 scrollbar-hidden">
          <div className="font-inter font-[500] text-sm text-[#aaaaaa]">
            Key Skills :
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="font-inter font-[500] text-[13px] tracking-[0.5px] flex items-center justify-center text-center px-1 py-1 rounded-sm bg-[#6b6b6b] text-[#f4f4f4]"
              >
                {skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase()}
              </div>
            ))}
          </div>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-end px-1 py-2 gap-3">
        <img
          onClick={animateSwipeRight}
          className="h-[32px] w-[32px] object-contain"
          src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748710879/iconamoon_heart-light_jililb.png"
        />
        {/* <img onClick={bookmark} className='h-[22px] w-[22px] object-contain' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748710879/Vector_4_kq2v16.png"/> */}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
