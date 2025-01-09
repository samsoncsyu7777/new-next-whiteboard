'use client';

import { useState } from 'react';

export default function TutorPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleFeedbackSubmit = (feedback) => {
    // Submit feedback to the backend
  };

  return (
    <div>
      <h1>Tutor Page</h1>
      {!selectedStudent ? (
        <ul>
          {students.map((student) => (
            <li key={student.id} onClick={() => setSelectedStudent(student)}>
              {student.nickname}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2>{selectedStudent.nickname}</h2>
          <textarea placeholder="Write feedback" />
          <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
          <button onClick={() => setSelectedStudent(null)}>Back</button>
        </div>
      )}
    </div>
  );
}
