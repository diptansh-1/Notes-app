import connect from '../../db';
import Notes from '../../models/Notes';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    await connect();

    const { id } = req.query;
    const { title, description } = req.body;

    // Find the note by ID
    const updatedNote = await Notes.findByIdAndUpdate(id, {title,description});


    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'An error occurred while updating the note' });
  }
}