CREATE DATABASE IF NOT EXISTS hackathon_db;
USE hackathon_db;

-- 1. Table Machine
CREATE TABLE IF NOT EXISTS machine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    protocol VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table Variable
CREATE TABLE IF NOT EXISTS variable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    machine_id INT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    type_var VARCHAR(20) NOT NULL,
    adresse_memoire VARCHAR(50) NOT NULL,
    unite VARCHAR(20),
    frequence_acquisition INT NOT NULL DEFAULT 60,
    FOREIGN KEY (machine_id) REFERENCES machine(id) ON DELETE CASCADE
);

-- 3. Table Historique
CREATE TABLE IF NOT EXISTS historique (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    variable_id INT NOT NULL,
    valeur FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (variable_id) REFERENCES variable(id) ON DELETE CASCADE
);