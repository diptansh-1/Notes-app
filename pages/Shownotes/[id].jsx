import React from "react";
import { useContext } from "react";
import { ColorContext } from "../../components/ColorContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Addnote from "@/components/addnote";
import Link from "next/link";
import { BiSolidPencil } from "react-icons/bi";

const ShowNotes = () => {
  const { color } = useContext(ColorContext);
  const router = useRouter();
  const { id } = router.query;

  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/getnotesbyid?id=${id}`);
        const { note } = await response.json();
        setNote(note);
      } catch (error) {
        console.error("Failed to fetch note", error);
      }
    };

    if (id) {
      fetchNote();
    }

    const rootContainer = document.querySelector(".root-container");

    if (rootContainer) {
      rootContainer.style.overflow = "hidden";
    }

    return () => {
      if (rootContainer) {
        rootContainer.style.overflow = "";
      }
    };
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Addnote />
      <div
        className={`mx-5 flex flex-row flex-wrap mt-[160px] h-[40rem] w-auto rounded-xl ${note.color} md:w-[90%] md:mt-9 md:h-[42rem]`}
      >
        <Link href={`/updateNotes/${id}`}>
      <div className="absolute right-7 mt-4 md:right-24 cursor-pointer bg-black rounded-full h-8 w-8 flex justify-center items-center md:h-10 md:w-10">
        <BiSolidPencil className="text-lg text-white" />
      </div>
      </Link>
        <input
          className={`focus:outline-none placeholder-gray-700  ${note.color} mt-5 mx-5 h-14 w-full font-bold text-lg`}
          type="text"
          value={note.title}
          placeholder="Title"
          readOnly
        />
        <textarea
          className={`focus:outline-none resize-none placeholder-gray-700 text-lg mx-5 h-[80%] w-full ${note.color} custom-scrollbar`}
          value={note.description}
          placeholder="Description"
          readOnly
        />
      </div>
    </>
  );
};

export default ShowNotes;
