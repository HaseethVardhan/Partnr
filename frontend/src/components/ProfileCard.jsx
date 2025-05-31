import React from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion";

const ProfileCard = ({ id, url, setCards, cards }) => {
  const x = useMotionValue(0);
  
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0.7, 1, 0.7]);
  const rotate = rotateRaw;

  const isFront = id === cards[cards.length - 1].id;

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  };

  return (
    <motion.div
      className="h-130 w-88 origin-bottom rounded-lg bg-[#333333] hover:cursor-grab active:cursor-grabbing px-3"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
        zIndex: isFront ? 1 : 0
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
      <div className='h-60 w-full mt-3'>
        <img 
        src={url} 
        alt="Placeholder alt"
        className="h-full w-full object-cover rounded-lg"
      />
      </div>
      <div className='flex flex-row items-center justify-between px-1 py-2'>
        <div className='flex flex-col items-start justify-between w-[50%]'>
          <div className='font-inter font-[500] text-sm text-[#aaaaaa]'>Name</div>
          <div className='font-inter font-[600] text-base text-white'>James</div>
        </div>
        <div className='flex flex-col items-end justify-between w-[50%]'>
          <div className='font-inter font-[500] text-sm text-[#aaaaaa]'>Profession</div>
          <div className='font-inter font-[600] text-base text-white'>Product Designer</div>
        </div>
      </div>
      <div className='flex flex-col items-start gap-2 justify-between px-1 '>
        <div className='font-inter font-[500] text-sm text-[#aaaaaa]'>Key Skills :</div>
        <div className='flex flex-row flex-wrap gap-2'>
          <div className='cursor-pointer font-inter font-[500] text-[13px] tracking-[0.5px] flex items-center justify-center text-center px-1 py-1 rounded-sm bg-[#6b6b6b] text-[#f4f4f4]'>
            Product Management
          </div>
          <div className='cursor-pointer font-inter font-[500] text-[13px] tracking-[0.5px] flex items-center justify-center text-center px-1 py-1 rounded-sm bg-[#6b6b6b] text-[#f4f4f4]'>
            Product Management
          </div>
          <div className='cursor-pointer font-inter font-[500] text-[13px] tracking-[0.5px] flex items-center justify-center text-center px-1 py-1 rounded-sm bg-[#6b6b6b] text-[#f4f4f4]'>
            Product Management
          </div>
          <div className='cursor-pointer font-inter font-[500] text-[13px] tracking-[0.5px] flex items-center justify-center text-center px-1 py-1 rounded-sm bg-[#6b6b6b] text-[#f4f4f4]'>
            Product Management
          </div>
          <div className='cursor-pointer font-inter font-[500] text-[13px] tracking-[0.5px] flex items-center justify-center text-center px-1 py-1 rounded-sm bg-[#6b6b6b] text-[#f4f4f4]'>
            Product Management
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center justify-end px-1 gap-3'>
        <img className='h-[32px] w-[32px] object-contain' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748710879/iconamoon_heart-light_jililb.png" />
        <img className='h-[22px] w-[22px] object-contain' src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748710879/Vector_4_kq2v16.png"/>
      </div>
    </motion.div>
  );
};

export default ProfileCard