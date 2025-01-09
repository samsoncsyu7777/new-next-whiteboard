export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Example dynamic data (replace with your database or backend logic)
      const students = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        nickname: `Student${index + 1}`,
      }));

      res.status(200).json({ students });
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Error fetching students.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
