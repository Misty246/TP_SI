const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 1. Récupérer tout l'historique
router.get('/historique', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM historique');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'historique :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 2. Enregistrer une nouvelle valeur dans l'historique (pour le futur simulateur / automate)
router.post('/historique', async (req, res) => {
    try {
        const { variable_id, valeur } = req.body;

        if (!variable_id || valeur === undefined) {
            return res.status(400).json({ error: 'variable_id et valeur sont obligatoires' });
        }

        const query = 'INSERT INTO historique (variable_id, valeur) VALUES (?, ?)';
        const [result] = await db.query(query, [variable_id, valeur]);

        res.status(201).json({ 
            message: 'Valeur enregistrée dans l\'historique', 
            historiqueId: result.insertId 
        });
    } catch (err) {
        console.error('Erreur lors de l\'insertion dans l\'historique :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;