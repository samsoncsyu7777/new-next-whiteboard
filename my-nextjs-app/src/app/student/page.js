'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false });

export default function StudentPage() {
  const [nickname, setNickname] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [hint, setHint] = useState('');
  const [latexQuestion, setLatexQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch('/api/question/read');
        const result = await response.json();

        if (response.ok) {
          setQuestionImage(result.image);
          setLatexQuestion(result.latex);
          setHint(result.hint);
        } else {
          console.error('Error fetching question:', result.error);
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    }
    fetchQuestion();
  }, []);

  const handleCheckStep = async (imageData) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stepData: imageData, // Send the canvas data as base64
          questionContext: latexQuestion,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.correct) {
          setFeedback(`Step ${currentStep} is correct! Proceed to step ${currentStep + 1}.`);
          setCurrentStep((prev) => prev + 1);
        } else {
          setFeedback(`Step ${currentStep} is incorrect: ${result.feedback}`);
        }
      } else {
        console.error('Error analyzing step:', result.error);
      }
    } catch (error) {
      console.error('Error analyzing step:', error);
      setFeedback('An error occurred while analyzing your step.');
    }
  };

  return (
    <div>
      <h1>Student Page</h1>
      <input
        type="text"
        placeholder="Enter Nickname"
        onChange={(e) => setNickname(e.target.value)}
      />
      {questionImage && <img src={questionImage} alt="Question" />}
      {latexQuestion && <div dangerouslySetInnerHTML={{ __html: latexQuestion }} />}
      <Canvas onSubmit={handleCheckStep} />
      <p>Hint: {hint}</p>
      <p>Feedback: {feedback}</p>
    </div>
  );
}
