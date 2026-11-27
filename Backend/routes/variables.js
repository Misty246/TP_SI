const express = require('express');
const router = express.Router();
const db = require('../db'); 

// 1. Récupérer toutes les variables
router.get('/variables', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM variable');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des variables :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 2. Ajouter une variable (via le formulaire de l'opérateur)
router.post('/variables', async (req, res) => {
    try {
        const { machine_id, nom, type_var, adresse_memoire, unite, frequence_acquisition } = req.body;

        if (!nom || !machine_id || !adresse_memoire || !type_var || !frequence_acquisition) {
            return res.status(400).json({ error: 'Tous les champs obligatoires ne sont pas remplis' });
        }

        const query = 'INSERT INTO variable (machine_id, nom, type_var, adresse_memoire, unite, frequence_acquisition) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [machine_id, nom, type_var, adresse_memoire, unite || null, frequence_acquisition]);

        res.status(201).json({ 
            message: 'Variable ajoutée avec succès', 
            variableId: result.insertId 
        });
    } catch (err) {
        console.error('Erreur lors de l\'insertion de la variable :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// 3. Modifier une variable
router.patch('/variables/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { machine_id, nom, type_var, adresse_memoire, unite, frequence_acquisition } = req.body;

        const query = 'UPDATE variable SET machine_id = ?, nom = ?, type_var = ?, adresse_memoire = ?, unite = ?, frequence_acquisition = ? WHERE id = ?';
        await db.query(query, [machine_id, nom, type_var, adresse_memoire, unite, frequence_acquisition, id]);

        res.json({ message: 'Variable mise à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la variable :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.delete('/variables/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM variable WHERE id = ?', [req.params.id]);
        res.json({ message: 'Variable supprimée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de la variable :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;