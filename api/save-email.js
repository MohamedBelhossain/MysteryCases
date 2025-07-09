import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const entry = `${email}\n`;
  const filePath = path.join(process.cwd(), 'emails.txt');

  try {
    fs.appendFileSync(filePath, entry);
  } catch (err) {
    return res.status(500).json({ error: 'Error saving email' });
  }

  res.status(200).json({ message: 'Email saved successfully!' });
}
