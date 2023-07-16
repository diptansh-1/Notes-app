"use client";

import Link from "next/link";
import React from "react";
import Search from "../components/search";
import { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notes = () => {
  const [data, setData] = useState([]);
  const [deletedNoteId, setDeletedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);

    const filteredNotes = data.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredData(filteredNotes);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getnotes");
      const { notes } = await response.json();
      setData(notes);
      setFilteredData(notes); 
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deletedNoteId]);

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/deletenote?id=${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // Note deleted successfully, update the data
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
        toast.success("Note deleted successfully", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Perform any desired actions upon successful submission
      } else {
        // console.error("Failed to save note:", response.status);
        toast.warn("Failed to delete the note", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Handle the error accordingly
      }
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  return (
    <>
      <div className="hidden md:flex">
        <Search onChange={handleSearch}/>
      </div>
      <div className="flex right-0 fixed z-50 md:hidden">
        <Search onChange={handleSearch}/>
      </div>
      <div className="space-y-3 mt-36 md:space-y-4 justify-self-center md:justify-self-start md:h-10 md:flex md:flex-wrap md:w-[95%] md:mt-0 gap-x-3">
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((item) => (
            <div
              key={item._id}
              className={`${item.color} relative flex justify-center items-center py-3 h-[110px] my-4 mx-[16px] md:mx-0 w-[365px] rounded-[10px] overflow-hidden md:w-[200px] md:h-[200px] md:pl-4 `}
            >
              <Link
                href={`/Shownotes/${item._id}`}
                className="focus:outline-none"
              >
                <span
                  className={`text-[25px] md:text-[20px] w-[290px] overflow-hidden md:w-[200px] md:h-[180px] md:pt-2 md:pr-2 border-none outline-none focus:ring-0 resize-none`}
                >
                  {item.title}
                </span>
              </Link>
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => deleteNote(item._id)}
              >
                <MdOutlineDeleteOutline className="text-lg text-gray-600 hover:text-black md:text-2xl" />
              </div>
              <Link
                href={`/updateNotes/${item._id}`}
                className="focus:outline-none"
              >
                <div className="absolute bottom-4 right-4 cursor-pointer bg-black rounded-full h-8 w-8 flex justify-center items-center">
                  <BiSolidPencil className="text-lg text-white" />
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex w-full h-[600px] justify-center">
            <p className="text-[70px] text-gray-300 mt-40">No notes exist</p>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Notes;
