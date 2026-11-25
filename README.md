Liste des choses à faire 

Backend :

- Créer les roots pour le frontend

- Gérer le relevé des valeurs sur l'automate

- Gérer connexion avec l'automate

Frontend : 

- Accueil avec toute la gestion pilotage KPI etc avec menu déroulant pour choisir l'automate et la ou les variables -> afficher différent graphique tel que une courbe d'évolution téléchargeable. Un tableau avec des données avec possibilité de télécharger en CSV

- Créer un menu pour navigue soit entre le dashboard soit le parametrage de l'automate/Variable

- Page de parametrage : faire des liste simple pour définir les différentes valeurs.

## Lancer les conteneurs

Depuis la racine du projet, démarrez MariaDB et le backend avec :

```powershell
docker compose up --build
```

Compose place les deux services sur le réseau `hackathon-net`. Le backend
rejoint MariaDB avec `DB_HOST=db` (le nom du service Compose) et le port
interne `3306`; il attend que MariaDB soit prête avant de démarrer. L'API est
accessible sur `http://localhost:3000/api/status` et MariaDB depuis l'hôte sur
le port `13306`.

Pour arrêter les conteneurs, utilisez `Ctrl+C`, puis `docker compose down`.