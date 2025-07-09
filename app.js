const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const PORT = 3000;


dotenv.config();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Routes API
app.use('/api/support', require('./routes/support')); 
app.use('/api/save-email', require('./routes/saveEmail')); 

// Lancement serveur
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

