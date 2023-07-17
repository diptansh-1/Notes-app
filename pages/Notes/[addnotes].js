import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ColorContext } from "../../components/ColorContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddNotePage() {
  const { color } = useContext(ColorContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {    
    const rootContainer = document.querySelector('.root-container');

    if (rootContainer) {
      rootContainer.style.overflow = 'hidden';
    }

    return () => {
      if (rootContainer) {
        rootContainer.style.overflow = '';
      }
    };
  }, []);
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Needed for Chrome and Firefox
      router.push("/"); // Redirect to the homepage
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  const handleAddNote = async () => {
    if (title.trim() === "" && description.trim() === "") {
      alert("Please add something");
      return;
    }
    const data = [
      {
        _id,
        title,
        description,
        color: color,
      },
    ];

    try {
      const response = await fetch("/api/addnotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Note saved successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        router.push("/");
      } else {
        toast.warn('Failed to save your note', {
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
      console.error("An error occurred:", error);
    }
  };

  return (
    <div
      className={`mx-5 flex flex-row flex-wrap mt-[160px] h-[40rem] w-auto rounded-xl ${color} md:w-[90%] md:mt-9 md:h-[42rem]`}
    >
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <input
        className={`focus:outline-none placeholder-gray-700  ${color} mt-5 mx-5 h-14 w-full`}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className={`focus:outline-none resize-none placeholder-gray-700 text-lg mx-5 h-[80%] w-full ${color} custom-scrollbar`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button
        onClick={handleAddNote}
        className="bg-white mx-auto rounded-3xl w-32 mb-1 border-[2px] border-black hover:bg-gray-200"
      >
        Save
      </button>
    </div>
  );
}
