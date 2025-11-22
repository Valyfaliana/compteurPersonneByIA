CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,        -- entrée, sortie, rien, bruit, etc.
    sensor_a TINYINT(1) DEFAULT NULL,       -- état du break beam A (0 ou 1)
    sensor_b TINYINT(1) DEFAULT NULL,       -- état du break beam B (0 ou 1)
    pir_state TINYINT(1) DEFAULT NULL,      -- état du PIR (0 ou 1)
    confidence FLOAT DEFAULT NULL,          -- score du modèle IA
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
