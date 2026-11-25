const ModbusRTU = require("modbus-serial");
const db = require("../db");

/**
 * Fonction pour interroger un automate et enregistrer ses variables
 * @param {Object} machine - Objet machine contenant { id, ip_address, nom }
 */
async function pollMachine(machine) {
    const client = new ModbusRTU();

    try {
        // 1. Connexion à l'automate via son IP (Port standard Modbus TCP : 502)
        await client.connectTCP(machine.ip_address, { port: 502 });
        client.setID(1); // ID de l'esclave Modbus (généralement 1)
        console.log(`[Modbus] Connecté à la machine : ${machine.nom} (${machine.ip_address})`);

        // 2. Récupérer depuis la base de données les variables associées à cette machine
        const [variables] = await db.query(
            'SELECT * FROM variable WHERE machine_id = ?', 
            [machine.id]
        );

        if (variables.length === 0) {
            console.log(`[Modbus] Aucune variable configurée pour ${machine.nom}`);
            client.close();
            return;
        }

        // 3. Pour chaque variable, lire sa valeur sur l'automate
        for (const v of variables) {
            // adresse_memoire dans la base (ex: "0", "40001", etc.) convertie en nombre
            const address = parseInt(v.adresse_memoire, 10);

            if (isNaN(address)) {
                console.warn(`[Modbus] Adresse mémoire invalide pour la variable ${v.nom}`);
                continue;
            }

            // Lecture d'un registre (Holding Register)
            // Note: readHoldingRegisters lit un tableau, on prend le premier élément [0]
            const data = await client.readHoldingRegisters(address, 1);
            const valeurLue = data.data[0];

            console.log(`[Modbus] ${v.nom} (Adr: ${address}) = ${valeurLue} ${v.unite || ''}`);

            // 4. Insérer la valeur lue directement dans la table historique
            await db.query(
                'INSERT INTO historique (variable_id, valeur) VALUES (?, ?)',
                [v.id, valeurLue]
            );
        }

        client.close();
    } catch (error) {
        console.error(`[Modbus Erreur] Impossible de communiquer avec ${machine.nom} (${machine.ip_address}) :`, error.message);
        try { client.close(); } catch (e) {}
    }
}

module.exports = { pollMachine };