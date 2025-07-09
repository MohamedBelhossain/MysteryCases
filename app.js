const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.json());


app.use('/public', express.static(path.join(__dirname, 'public'))); 
app.use('/src', express.static(path.join(__dirname, 'src')));    


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/save-email', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const entry = `${email}\n`;
  fs.appendFile('emails.txt', entry, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving email' });
    }
    res.status(200).json({ message: 'Email saved successfully!' });
  });
});
app.post('/support', (req, res) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: 'Champs manquants.' });
  }
  const supportEntry = {
    email,
    message,
    date: new Date().toISOString()
  };

  const filePath = path.join(__dirname, 'support.json');
  let existing = [];

  try {
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.error('Erreur lecture fichier:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }

  existing.push(supportEntry);

  try {
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error('Erreur écriture fichier:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }

  res.json({ success: true, message: 'Message enregistré.' });
});


app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
