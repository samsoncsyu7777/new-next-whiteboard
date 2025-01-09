import { OpenAI } from 'openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { stepData, questionContext } = req.body;

    if (!stepData || !questionContext) {
      res.status(400).json({ error: 'Missing step data or question context.' });
      return;
    }

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: `You are a math tutor. Provide detailed feedback for the following student step:\n\nStep: ${stepData}\n\nQuestion Context: ${questionContext}\n\nFeedback:`,
        max_tokens: 150,
      });

      const feedback = response.choices[0].text.trim();
      const correct = feedback.toLowerCase().includes('correct');

      res.status(200).json({ feedback, correct });
    } catch (error) {
      console.error('OpenAI Error:', error);
      res.status(500).json({ error: 'Error generating feedback.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
