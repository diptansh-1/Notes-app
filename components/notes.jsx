import Link from "next/link";
import React, { useState, useEffect } from "react";
import Search from "../components/search";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, parseISO } from "date-fns";

const Notes = () => {
  const [data, setData] = useState([]);
  const [deletedNoteId, setDeletedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

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
        setDeletedNoteId(id);
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
      } else {
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
      }
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const handleDeleteConfirmation = (note) => {
    setShowDeleteConfirmation(true);
    setNoteToDelete(note);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setNoteToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete._id);
    }
    setShowDeleteConfirmation(false);
    setNoteToDelete(null);
  };

  return (
    <>
      <div className="hidden md:flex">
        <Search onChange={handleSearch} />
      </div>
      <div className="flex right-0 fixed z-50 md:hidden">
        <Search onChange={handleSearch} />
      </div>
      <div className="space-y-3 mt-36 md:space-y-4 justify-self-center md:justify-self-start md:h-10 md:flex md:flex-wrap md:w-[95%] md:mt-0 gap-x-3">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item._id}
              className={`${item.color} relative flex justify-center items-center py-3 h-[120px] my-4 mx-[16px] md:mx-0 w-[365px] rounded-[10px] overflow-hidden md:w-[200px] md:h-[200px] md:pl-4 `}
            >
              <Link
                href={`/Shownotes/${item._id}`}
                className="focus:outline-none"
              >
                <textarea
                  readOnly
                  value={item.title}
                  className={`text-[25px] md:text-[20px] ${item.color} w-[290px] md:w-[200px] md:-mt-9 md:h-[130px] md:pt-2 md:pr-2 border-none outline-none focus:ring-0 resize-none cursor-pointer title-container`}
                />
              </Link>
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleDeleteConfirmation(item)}
              >
                <MdOutlineDeleteOutline className="text-lg text-gray-600 hover:text-black md:text-2xl transition-all ease-in-out" />
              </div>
              <Link
                href={`/updateNotes/${item._id}`}
                className="focus:outline-none"
              >
                <div className="absolute bottom-4 right-4 cursor-pointer bg-black rounded-full h-8 w-8 flex justify-center items-center hover:h-[34px] hover:w-[34px] transition-all ease-in-out">
                  <BiSolidPencil className="text-lg text-white" />
                </div>
              </Link>
              <div className="absolute -rotate-90 -left-6 text-sm md:rotate-0 md:bottom-3 md:left-3 text-gray-700 font-semibold">
              {format(parseISO(item.createdAt), "MMM d, yyyy")}
                </div>
            </div>
          ))
        ) : (
          <div className="flex w-full h-[600px] justify-center">
            <p className="text-[70px] text-gray-300 mt-40">No notes exist</p>
          </div>
        )}
      </div>
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`bg-white rounded-lg p-8`}>
            <p className="text-lg font-semibold mb-4">Delete Confirmation</p>
            <p className="mb-4">Are you sure you want to delete this note?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmDelete}
              >
                OK
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-500 px-4 py-2 rounded"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
