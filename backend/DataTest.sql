DELIMITER $$

CREATE PROCEDURE generate_event_data()
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE random_date DATETIME;
    DECLARE random_hour INT;
    DECLARE random_confidence FLOAT;
    DECLARE day_weight FLOAT;
    DECLARE hour_weight FLOAT;
    
    -- Vider la table si elle existe déjà
    TRUNCATE TABLE events;
    
    WHILE i < 5000 DO
        -- Générer une date aléatoire entre le 1er août et le 31 octobre 2025
        SET random_date = DATE_ADD('2025-08-01', INTERVAL FLOOR(RAND() * 92) DAY);
        
        -- Pondération selon le jour de la semaine (plus d'activité en semaine)
        SET day_weight = CASE DAYOFWEEK(random_date)
            WHEN 1 THEN 0.5  -- Dimanche
            WHEN 7 THEN 0.6  -- Samedi
            ELSE 1.0         -- Lundi-Vendredi
        END;
        
        -- Ne garder que si le poids aléatoire est respecté (distribution réaliste)
        IF RAND() < day_weight THEN
            -- Heure pondérée (plus d'activité 8h-18h)
            SET random_hour = CASE 
                WHEN RAND() < 0.7 THEN 8 + FLOOR(RAND() * 10)  -- 70% entre 8h-18h
                ELSE FLOOR(RAND() * 24)                        -- 30% autres heures
            END;
            
            -- Ajouter l'heure, les minutes et les secondes
            SET random_date = DATE_ADD(
                DATE_ADD(
                    DATE_ADD(random_date, INTERVAL random_hour HOUR),
                    INTERVAL FLOOR(RAND() * 60) MINUTE
                ),
                INTERVAL FLOOR(RAND() * 60) SECOND
            );
            
            -- Confidence suit une distribution normale autour de 0.7-0.9
            SET random_confidence = LEAST(1.0, GREATEST(0.0, 
                0.8 + (RAND() - 0.5) * 0.4  -- Centré sur 0.8, variance de ±0.2
            ));
            
            -- Insérer la ligne
            INSERT INTO events (event_type, confidence, created_at)
            VALUES ('entree', ROUND(random_confidence, 3), random_date);
            
            SET i = i + 1;
        END IF;
    END WHILE;
    
    SELECT CONCAT('✓ ', i, ' lignes générées du ', 
                  MIN(created_at), ' au ', MAX(created_at)) AS resultat
    FROM events;
END$$

DELIMITER ;

-- Exécuter la procédure
CALL generate_event_data();

-- Supprimer la procédure après utilisation
DROP PROCEDURE generate_event_data;