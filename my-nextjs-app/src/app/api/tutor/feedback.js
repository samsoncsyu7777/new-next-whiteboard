import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { studentId, feedback } = req.body;

    if (!studentId || !feedback) {
      res.status(400).json({ error: 'Missing student ID or feedback.' });
      return;
    }

    try {
      // Simulating database or file-based storage
      const feedbackPath = path.join(process.cwd(), '/data/feedback.json');

      // Ensure the feedback file exists
      if (!fs.existsSync(feedbackPath)) {
        fs.writeFileSync(feedbackPath, JSON.stringify({}));
      }

      // Read existing feedback data
      const existingData = JSON.parse(fs.readFileSync(feedbackPath, 'utf-8'));

      // Add or update feedback for the student
      existingData[studentId] = feedback;

      // Write updated data back to the file
      fs.writeFileSync(feedbackPath, JSON.stringify(existingData, null, 2));

      res.status(200).json({ message: 'Feedback submitted successfully.' });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ error: 'Error saving feedback.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
