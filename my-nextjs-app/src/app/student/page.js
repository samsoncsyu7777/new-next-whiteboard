'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getQuestion } from '@/utils/vision';

const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false });

export default function StudentPage() {
  const [nickname, setNickname] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [hint, setHint] = useState('');
  const [latexQuestion, setLatexQuestion] = useState('');

  useEffect(() => {
    async function fetchQuestion() {
      const result = await getQuestion();
      setQuestionImage(result.image);
      setLatexQuestion(result.latex);
      setHint(result.hint);
    }
    fetchQuestion();
  }, []);

  const handleCheckStep = async (step) => {
    // Logic to analyze student's step with AI
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
      <p>{hint}</p>
    </div>
  );
}
