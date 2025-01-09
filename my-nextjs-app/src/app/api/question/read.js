import fs from 'fs';
import path from 'path';
import { processQuestionImage } from '@/utils/vision';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const questionImagePath = path.join(process.cwd(), '/public/uploads/question.jpg');

    if (!fs.existsSync(questionImagePath)) {
      res.status(404).json({ error: 'Question image not found.' });
      return;
    }

    try {
      // Use the utility function for processing the image
      const { latex, hint } = await processQuestionImage(questionImagePath);

      res.status(200).json({
        image: '/uploads/question.jpg',
        latex,
        hint,
      });
    } catch (error) {
      console.error('Error processing question image:', error);
      res.status(500).json({ error: 'Error processing the question image.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
