import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { ColorContext } from "./ColorContext";
import { useContext } from "react";
import Link from "next/link";

const Addnote = () => {
  const { updateColor } = useContext(ColorContext);
  const [phonerotation, setPhonerotation] = useState(0);
  const [phonecolorpallet, setPhonecolorpallet] = useState(false);

  const phoneRotateIcon = () => {
    let phoneNewRotation;
    if (phonecolorpallet === true) {
      phoneNewRotation = phonerotation + 180;
    } else {
      phoneNewRotation = phonerotation - 180;
    }
    setPhonerotation(phoneNewRotation);
    setPhonecolorpallet(!phonecolorpallet);
  };

  const handleButtonClick = (bgColor) => {
    updateColor(bgColor);
  };

  return (
    <>
      <div className="self-end justify-self-end h-20 mb-6 fixed md:hidden">
        <motion.div
          animate={{ rotate: phonerotation }}
          transition={{ duration: 0.5 }}
          onClick={phoneRotateIcon}
          className="flex items-center justify-center mr-8 h-[70px] w-[70px] bg-black rounded-full"
        >
          <AiOutlinePlus className="text-white text-3xl" />
        </motion.div>
      </div>

      <div
        className={`h-52 w-72 ${
          phonecolorpallet ? "flex" : "hidden"
        } justify-center items-center fixed self-end justify-self-end mr-16 -mb-9 gap-x-2 md:hidden`}
      >
        <Link href="/Notes/addnotes">
          <motion.div
            onClick={() => handleButtonClick("custom-div")}
            variants={fadeIn("left", "spring", 2, 0.75)}
            initial="hidden"
            whileInView="show"
            className="bg-yellow-300 h-8 w-8 rounded-full border border-black"
          ></motion.div>
        </Link>

        <Link href="/Notes/addnotes">
          <motion.div
            onClick={() => handleButtonClick("custom-divo")}
            variants={fadeIn("left", "spring", 1.5, 0.75)}
            initial="hidden"
            whileInView="show"
            className="bg-orange-400 h-8 w-8 rounded-full border border-black"
          ></motion.div>
        </Link>

        <Link href="/Notes/addnotes">
          <motion.div
            onClick={() => handleButtonClick("custom-divv")}
            variants={fadeIn("left", "spring", 1, 0.75)}
            initial="hidden"
            whileInView="show"
            className="bg-violet-400 h-8 w-8 rounded-full border border-black"
          ></motion.div>
        </Link>

        <Link href="/Notes/addnotes">
          <motion.div
            onClick={() => handleButtonClick("custom-divc")}
            variants={fadeIn("left", "spring", 0.5, 0.75)}
            initial="hidden"
            whileInView="show"
            className="bg-cyan-400 h-8 w-8 rounded-full border border-black"
          ></motion.div>
        </Link>

        <Link href="/Notes/addnotes">
          <motion.div
            onClick={() => handleButtonClick("custom-divl")}
            variants={fadeIn("left", "spring", 0, 0.75)}
            initial="hidden"
            whileInView="show"
            className="bg-lime-400 h-8 w-8 rounded-full border border-black"
          ></motion.div>
        </Link>
      </div>
    </>
  );
};

export default Addnote;
