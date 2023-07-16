import connect from '../../db';
import Notes from '../../models/Notes';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    await connect();

    const { id } = req.query;

    // Find the note by ID
    const deletenote = await Notes.deleteOne({_id:id});

    res.status(200).json();
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'An error occurred while fetching the note' });
  }
}