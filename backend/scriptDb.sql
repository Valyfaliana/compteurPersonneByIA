CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,        -- entrée, sortie, rien
    confidence FLOAT DEFAULT NULL,          -- score du modèle IA
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
