import React from 'react'
import { useContext } from 'react';
import { ColorContext } from '../../components/ColorContext';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Notes from "../../models/Notes";
import mongoose from "mongoose";
import Addnote from '@/components/addnote';

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

      
    const rootContainer = document.querySelector('.root-container');

    if (rootContainer) {
      rootContainer.style.overflow = 'hidden';
    }

    return () => {
      if (rootContainer) {
        rootContainer.style.overflow = '';
      }
    };
    }, [id]);
  
    if (!note) {
      return <div>Loading...</div>;
    }
  

    return (
      <>
        <Addnote/>
        <div className={`mx-5 flex flex-row flex-wrap mt-[160px] h-[40rem] w-auto rounded-xl ${note.color} md:w-[90%] md:mt-9 md:h-[42rem]`}>
          <input
            className={`focus:outline-none placeholder-gray-700  ${note.color} mt-5 mx-5 h-14 w-full`}
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
          {/* <button className='bg-white mx-auto rounded-3xl w-32 mb-1 border-[2px] border-black hover:bg-gray-200'>Save</button> */}
        </div>
        </>
      );
}

export default ShowNotes
