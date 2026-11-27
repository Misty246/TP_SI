const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 1. Récupérer toutes les machines
router.get('/machines', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM machine');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des machines :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 2. Ajouter une machine (via le formulaire de l'opérateur)
router.post('/machines', async (req, res) => {
    try {
        const { nom, protocol, ip_address } = req.body;

        if (!nom || !protocol || !ip_address) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        const query = 'INSERT INTO machine (nom, protocol, ip_address) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [nom, protocol, ip_address]);

        res.status(201).json({ 
            message: 'Machine ajoutée avec succès', 
            machineId: result.insertId 
        });
    } catch (err) {
        console.error('Erreur lors de l\'insertion de la machine :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 3. Modifier une machine (via le formulaire de l'opérateur)
router.patch('/machines/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, protocol, ip_address } = req.body;

        const query = 'UPDATE machine SET nom = ?, protocol = ?, ip_address = ? WHERE id = ?';
        await db.query(query, [nom, protocol, ip_address, id]);

        res.json({ message: 'Machine mise à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la machine :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.delete('/machines/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM machine WHERE id = ?', [req.params.id]);
        res.json({ message: 'Automate supprimé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'automate :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;