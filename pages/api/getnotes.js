import connect from '../../db';
import Notes from '../../models/Notes';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    await connect();

    // Retrieve users from the database
    const notes = await Notes.find();

    res.status(200).json({notes});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
}