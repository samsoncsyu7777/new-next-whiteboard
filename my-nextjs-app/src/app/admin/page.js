'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState('');
  const [tutorPassword, setTutorPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleChangeAdminPassword = async () => {
    if (!adminPassword) {
      setStatus('Please enter a new admin password.');
      return;
    }

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'admin',
          newPassword: adminPassword,
        }),
      });

      if (response.ok) {
        setStatus('Admin password updated successfully!');
        setAdminPassword(''); // Clear input field
      } else {
        const result = await response.json();
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating admin password:', error);
      setStatus('An error occurred while updating the admin password.');
    }
  };

  const handleChangeTutorPassword = async () => {
    if (!tutorPassword) {
      setStatus('Please enter a new tutor password.');
      return;
    }

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'tutor',
          newPassword: tutorPassword,
        }),
      });

      if (response.ok) {
        setStatus('Tutor password updated successfully!');
        setTutorPassword(''); // Clear input field
      } else {
        const result = await response.json();
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating tutor password:', error);
      setStatus('An error occurred while updating the tutor password.');
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Change Admin Password</h2>
        <input
          type="password"
          placeholder="New Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <button onClick={handleChangeAdminPassword}>Change Admin Password</button>
      </div>
      <div>
        <h2>Change Tutor Password</h2>
        <input
          type="password"
          placeholder="New Tutor Password"
          value={tutorPassword}
          onChange={(e) => setTutorPassword(e.target.value)}
        />
        <button onClick={handleChangeTutorPassword}>Change Tutor Password</button>
      </div>
      {status && <p>{status}</p>}
    </div>
  );
}
