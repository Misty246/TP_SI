const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route de test
app.get('/api/status', (req, res) => {
  res.json({ message: "Le backend fonctionne !" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});