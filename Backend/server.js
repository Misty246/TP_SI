const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const machineRoutes = require('./routes/machines');
const variableRoutes = require('./routes/variables');
const historiqueRoutes = require('./routes/historique');
const { pollMachine } = require('./services/modbusService'); // <-- 1. Import du service Modbus

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./db');

app.use(cors());
app.use(express.json());
app.use('/api', machineRoutes);
app.use('/api', variableRoutes);
app.use('/api', historiqueRoutes);

// Route de test
app.get('/api/status', (req, res) => {
  res.json({ message: "Le backend fonctionne !" });
});

// 2. Fonction de la boucle de scrutation automatique
async function startPollingLoop() {
  console.log("Démarrage du service de scrutation Modbus TCP...");

  setInterval(async () => {
    try {
      // Récupère toutes les machines configurées en Modbus TCP dans MariaDB
      const [machines] = await pool.query('SELECT * FROM machine WHERE protocol = "Modbus TCP"');

      for (const machine of machines) {
        await pollMachine(machine);
      }
    } catch (err) {
      console.error("Erreur dans la boucle de scrutation :", err.message);
    }
  }, 5000); // Toutes les 5 secondes (ajuste selon ton besoin)
}

async function startServer() {
  try {
    await pool.query('SELECT 1');
    console.log('Connexion à MariaDB réussie');
  } catch (error) {
    console.error('Connexion à MariaDB impossible :', error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    
    // 3. Lancement de la scrutation au démarrage du serveur
    startPollingLoop();
  });
}

startServer();