import { adminDb } from '@/utils/admin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { role, newPassword } = req.body;

    if (!role || !newPassword) {
      res.status(400).json({ error: 'Missing role or new password.' });
      return;
    }

    try {
      // Save the password in Firestore
      await adminDb.collection('passwords').doc(role).set({ password: newPassword });

      res.status(200).json({ message: `${role} password updated successfully.` });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Error updating password.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
