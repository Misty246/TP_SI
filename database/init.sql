CREATE TABLE Machine(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Id_Machine INT,
    Working_Time INT,
    Status VARCHAR(50),
    Error INT,
    Temp FLOAT,
    NonWorking_Time INT,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);