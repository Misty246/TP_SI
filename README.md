# Projet Hackathon SI

Application de supervision industrielle composée d'une API Node.js, d'une base
MariaDB et d'une petite page web de test.

## Prérequis

- Windows avec Docker Desktop installé et démarré.
- Docker Desktop configuré pour utiliser les conteneurs Linux (backend WSL 2).
- Docker Compose v2 (`docker compose`, avec un espace).

Node.js et npm ne sont pas nécessaires pour le démarrage avec Docker Compose.

## Configuration

À la racine du projet, vérifiez que le fichier `.env` contient ces variables :

```env
PORT=3000
DB_NAME=hackathon_db
DB_USER=hackathon_user
DB_PASSWORD=change-me
MYSQL_ROOT_PASSWORD=change-me-too
```

Remplacez les valeurs d'exemple par des mots de passe adaptés. Conservez
`DB_NAME=hackathon_db` tant que `Backend/database/init.sql` utilise ce nom.
Compose configure automatiquement `DB_HOST=db` pour que le backend trouve le
service MariaDB sur son réseau Docker.

Ne partagez pas le fichier `.env` s'il contient des mots de passe réels.

## Démarrer l'application

cd "C:\chemin\vers\TP-Déploiement d'un SI"
docker compose up --build

Laissez cette fenêtre ouverte. Compose construit l'image du backend, démarre
MariaDB, attend que la base soit prête, puis lance l'API.

Pour lancer les conteneurs en arrière-plan :

docker compose up --build -d
docker compose logs -f backend

## Vérifier et utiliser

- API : <http://localhost:3000/api/status>
- Page frontend de test : ouvrir `Frontend/Index.html` dans un navigateur.
- MariaDB depuis un outil installé sur Windows : hôte `localhost`, port
  `13306`, base `hackathon_db`; utilisez les identifiants de `.env`.

Routes actuellement disponibles :

- `GET /api/machines`, `POST /api/machines`, `PATCH /api/machines/:id`
- `GET /api/variables`, `POST /api/variables`, `PATCH /api/variables/:id`
- `GET /api/historique`, `POST /api/historique`

Le backend interroge périodiquement les machines configurées en Modbus TCP.
Pour que ces lectures fonctionnent, l'automate doit être joignable depuis le
conteneur backend.

## Base de données

Au premier démarrage sur un volume vide, MariaDB exécute les scripts SQL de
`Backend/database`. Les données sont ensuite conservées dans le volume Docker
`db_data` : un simple redémarrage ne réexécute pas `init.sql` et ne supprime
pas les données.

## Arrêter et dépanner

En mode premier plan, arrêtez avec `Ctrl+C`. En mode arrière-plan :

docker compose down

`docker compose down` conserve les données de MariaDB. Si Docker indique qu'il
ne peut pas se connecter à son API, démarrez Docker Desktop et vérifiez avec
`docker info`. Pour consulter les journaux : `docker compose logs -f backend`
ou `docker compose logs -f db`.

## Fonctionnalités frontend à terminer

- Dashboard avec KPI, graphiques et export des données en CSV.
- Navigation entre le dashboard et le paramétrage.
- Pages de paramétrage des automates et des variables.
