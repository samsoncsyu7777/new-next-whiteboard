'use client';

import { useState, useEffect } from 'react';

export default function TutorPage() {
  const [students, setStudents] = useState([]); // Dynamic array for students
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  // Fetch students dynamically
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch('/api/tutor/students'); // Replace with your API endpoint
        const data = await response.json();
        if (response.ok) {
          setStudents(data.students);
        } else {
          console.error('Error fetching students:', data.error);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
    fetchStudents();
  }, []);

  const handleFeedbackSubmit = async () => {
    if (!selectedStudent || !feedback) {
      setStatus('Please select a student and provide feedback.');
      return;
    }

    try {
      const response = await fetch('/api/tutor/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          feedback,
        }),
      });

      if (response.ok) {
        setStatus(`Feedback submitted for ${selectedStudent.nickname}.`);
        setFeedback(''); // Clear feedback after submission
      } else {
        const result = await response.json();
        setStatus(`Error submitting feedback: ${result.error}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('An error occurred while submitting feedback.');
    }
  };

  return (
    <div>
      <h1>Tutor Page</h1>
      {!selectedStudent ? (
        <div>
          <h2>Select a Student</h2>
          <ul>
            {students.map((student) => (
              <li
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                style={{ cursor: 'pointer', margin: '10px 0', color: 'blue' }}
              >
                {student.nickname}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Provide Feedback for {selectedStudent.nickname}</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here"
            rows="5"
            cols="50"
            style={{ display: 'block', margin: '10px 0' }}
          />
          <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
          <button onClick={() => setSelectedStudent(null)}>Back</button>
          {status && <p>{status}</p>}
        </div>
      )}
    </div>
  );
}
