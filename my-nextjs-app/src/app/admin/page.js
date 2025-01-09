'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState('');
  const [tutorPassword, setTutorPassword] = useState('');

  const handleChangeAdminPassword = () => {
    // Logic to change admin password
  };

  const handleChangeTutorPassword = () => {
    // Logic to change tutor password
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <input
          type="password"
          placeholder="New Admin Password"
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <button onClick={handleChangeAdminPassword}>Change Admin Password</button>
      </div>
      <div>
        <input
          type="password"
          placeholder="New Tutor Password"
          onChange={(e) => setTutorPassword(e.target.value)}
        />
        <button onClick={handleChangeTutorPassword}>Change Tutor Password</button>
      </div>
      <ImageUploader />
    </div>
  );
}
