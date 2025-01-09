import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disables body parsing for formidable
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    const uploadsDir = path.join(process.cwd(), '/public/uploads');

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    form.uploadDir = uploadsDir;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Formidable Error:', err);
        res.status(500).json({ error: 'Error processing the upload.' });
        return;
      }

      const oldPath = files.image.filepath;
      const newPath = path.join(uploadsDir, files.image.originalFilename);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('File Rename Error:', err);
          res.status(500).json({ error: 'Error saving the file.' });
        } else {
          res.status(200).json({ imageUrl: `/uploads/${files.image.originalFilename}` });
        }
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
