import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Missing fields.' });
  }

  const supportEntry = {
    email,
    message,
    date: new Date().toISOString(),
  };

  const filePath = path.join(process.cwd(), 'support.json');
  let existing = [];

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      existing = JSON.parse(data);
    }
  } catch (err) {
    console.error('File read error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }

  existing.push(supportEntry);

  try {
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('File write error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }

  res.status(200).json({ success: true, message: 'Message saved.' });
}
