import { useState } from 'react';

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
      } else {
        setUploadStatus('Image upload failed.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      setUploadStatus('An error occurred during upload.');
    }
  };

  return (
    <div>
      <h2>Upload Question Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
}
