import connect from '../../db';
import Notes from '../../models/Notes';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    await connect();

    // Create a new notes
    // const { name, email, phone } = req.body;
    for(let i = 0; i<req.body.length; i++){
    const notes = new Notes({ 
      title: req.body[i].title,
      description: req.body[i].description, 
      color: req.body[i].color,
    });

    // Save the notes to the database
    await notes.save();
  }
    res.status(200).json({ message: 'Notes saved successfully' });
  } catch (error) {
    console.error('Error saving notes:', error);
    res.status(500).json({ message: 'An error occurred while saving the notes' });
  }
}