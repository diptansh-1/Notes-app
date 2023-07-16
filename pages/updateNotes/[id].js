import React, { useContext, useEffect, useState } from 'react';
import { ColorContext } from '../../components/ColorContext';
import { useRouter } from 'next/router';
import Addnote from '@/components/addnote';

const UpdateNote = () => {
  const { color } = useContext(ColorContext);
  const router = useRouter();
  const { id } = router.query;

  const [note, setNote] = useState(null);
  const [updatedNote, setUpdatedNote] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/getnotesbyid?id=${id}`);
        const { note } = await response.json();
        setNote(note);
        setUpdatedNote({
          title: note.title,
          description: note.description,
        });
      } catch (error) {
        console.error('Failed to fetch note', error);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleTitleChange = (event) => {
    setUpdatedNote({
      ...updatedNote,
      title: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setUpdatedNote({
      ...updatedNote,
      description: event.target.value,
    });
  };

  const updateNote = async (id) => {
    try {
      const response = await fetch(`/api/updatenote?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Note updated successfully');
        router.push(`/Shownotes/${id}`);
      } 
      else {
        // Handle error, e.g., show an error message
        console.error('Failed to update note');
      }
    } catch (error) {
      console.error('Failed to update note', error);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Addnote />
      <div className={`mx-5 flex flex-row flex-wrap mt-[160px] h-[40rem] w-auto rounded-xl ${note.color} md:w-[90%] md:mt-9 md:h-[42rem]`}>
        <input
          className={`focus:outline-none placeholder-gray-700  ${note.color} mt-5 mx-5 h-14 w-full`}
          type="text"
          value={updatedNote.title}
          placeholder="Title"
          onChange={handleTitleChange}
        />
        <textarea
          className={`focus:outline-none resize-none placeholder-gray-700 text-lg mx-5 h-[80%] w-full ${note.color}`}
          value={updatedNote.description}
          placeholder="Description"
          onChange={handleDescriptionChange}
        />
        <button className="bg-white mx-auto rounded-3xl w-32 mb-1 border-[2px] border-black hover:bg-gray-200" onClick={()=>updateNote(id)}>
          Save
        </button>
      </div>
    </>
  );
};

export default UpdateNote;
