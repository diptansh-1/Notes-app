"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { useState } from "react";
import { ColorContext } from "./ColorContext";
import { useContext } from "react";
import Link from "next/link";

const Navbar = () => {
  const { updateColor } = useContext(ColorContext);
  const [rotation, setRotation] = useState(0);
  const [colorpallet, setColorpallet] = useState(false);
  const [color, setColor] = useState("");

  const rotateIcon = () => {
    let newRotation;
    if (colorpallet === true) {
      newRotation = rotation + 180;
    } else {
      newRotation = rotation - 180;
    }
    setRotation(newRotation);
    setColorpallet(!colorpallet);
  };

  const handleButtonClick = (bgColor) => {
    updateColor(bgColor);
  };

  return (
    <>
      {/* mobile view */}
      <div className="grid grid-cols-2 z-10 fixed md:fixed w-full bg-white md:hidden">
        <span className="text-[43px] font-semibold px-[24px] py-[47px]">
        <Link href={"/"}>Notes</Link>
        </span>
      </div>

      {/* desktop view */}

      <div className="hidden md:flex md:justify-center md:fixed md:gap-x-3 md:h-full md:w-28 md:shadow-2xl">
        <div className="mt-10">
          <Link href={"/"}>
          <span className="text-[20px] font-bold">Notes</span>
          </Link>
        </div>
        <div className="mt-48 cursor-pointer">
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 0.5 }}
            onClick={rotateIcon}
            className="flex -ml-[57px] items-center fixed justify-center h-[50px] w-[50px] bg-black rounded-full"
          >
            <AiOutlinePlus className="text-white text-3xl" />
          </motion.div>
        </div>
        <div
          className={`${
            colorpallet ? "grid" : "hidden"
          } mt-[17rem] grid-flow-row items-center fixed justify-center mr-[2px]`}
        >
          <Link href="/Notes/addnotes">
            <motion.div
              onClick={() => handleButtonClick("custom-div")}
              variants={fadeIn("down", "spring", 0, 0.75)}
              initial="hidden"
              whileInView="show"
              className="bg-yellow-300 cursor-pointer rounded-full h-6 w-6 flex items-center justify-center ml-[2px] mb-5 hover:border-black hover:border"
            ></motion.div>
          </Link>
          <Link href="/Notes/addnotes">
            <motion.div
              onClick={() => handleButtonClick("custom-divo")}
              variants={fadeIn("down", "spring", 0.5, 0.75)}
              initial="hidden"
              whileInView="show"
              className="bg-orange-400 cursor-pointer rounded-full h-6 w-6 flex items-center justify-center ml-[2px] mb-5 hover:border-black hover:border"
            ></motion.div>
          </Link>
          <Link href="/Notes/addnotes">
            <motion.div
              onClick={() => handleButtonClick("custom-divv")}
              variants={fadeIn("down", "spring", 1, 0.75)}
              initial="hidden"
              whileInView="show"
              className="bg-violet-400 cursor-pointer rounded-full h-6 w-6 flex items-center justify-center ml-[2px] mb-5 hover:border-black hover:border"
            ></motion.div>
          </Link>
          <Link href="/Notes/addnotes">
            <motion.div
              onClick={() => handleButtonClick("custom-divc")}
              variants={fadeIn("down", "spring", 1.5, 0.75)}
              initial="hidden"
              whileInView="show"
              className="bg-cyan-400 cursor-pointer rounded-full h-6 w-6 flex items-center justify-center ml-[2px] mb-5 hover:border-black hover:border"
            ></motion.div>
          </Link>
          <Link href="/Notes/addnotes">
            <motion.div
              onClick={() => handleButtonClick("custom-divl")}
              variants={fadeIn("down", "spring", 2, 0.75)}
              initial="hidden"
              whileInView="show"
              className="bg-lime-400 cursor-pointer rounded-full h-6 w-6 flex items-center justify-center ml-[2px] mb-5 hover:border-black hover:border"
            ></motion.div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
