// Données statiques simulant la table events, pour tests et démo graphique
// Format : id, event_type, sensor_a, sensor_b, pir_state, confidence, created_at

export const staticEventsData = [
    // Janvier 2025
    { id: 100, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.95, created_at: '2025-01-05T08:10:00' },
    // { id: 101, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.91, created_at: '2025-01-12T09:20:00' },
    // { id: 102, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.60, created_at: '2025-01-19T10:30:00' },
    { id: 103, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-01-25T11:40:00' },
    // Février 2025
    { id: 110, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.96, created_at: '2025-02-03T08:15:00' },
    // { id: 111, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.92, created_at: '2025-02-14T09:25:00' },
    // { id: 112, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.62, created_at: '2025-02-21T10:35:00' },
    { id: 113, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.98, created_at: '2025-02-28T11:45:00' },
    // Mars 2025
    { id: 120, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.94, created_at: '2025-03-06T08:20:00' },
    // { id: 121, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.93, created_at: '2025-03-13T09:30:00' },
    // { id: 122, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.61, created_at: '2025-03-20T10:40:00' },
    { id: 123, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.99, created_at: '2025-03-27T11:50:00' },
    // Avril 2025
    { id: 130, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.93, created_at: '2025-04-04T08:25:00' },
    // { id: 131, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.90, created_at: '2025-04-11T09:35:00' },
    // { id: 132, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.59, created_at: '2025-04-18T10:45:00' },
    { id: 133, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-04-25T11:55:00' },
    // Mai 2025
    { id: 140, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.95, created_at: '2025-05-02T08:30:00' },
    // { id: 141, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.91, created_at: '2025-05-09T09:40:00' },
    // { id: 142, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.60, created_at: '2025-05-16T10:50:00' },
    { id: 143, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.96, created_at: '2025-05-23T11:00:00' },
    // Juin 2025
    { id: 150, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.94, created_at: '2025-06-06T08:35:00' },
    // { id: 151, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.92, created_at: '2025-06-13T09:45:00' },
    // { id: 152, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.61, created_at: '2025-06-20T10:55:00' },
    { id: 153, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-06-27T11:05:00' },
    // Juillet 2025
    { id: 160, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.95, created_at: '2025-07-04T08:40:00' },
    // { id: 161, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.93, created_at: '2025-07-11T09:50:00' },
    // { id: 162, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.62, created_at: '2025-07-18T11:00:00' },
    { id: 163, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.98, created_at: '2025-07-25T12:10:00' },
    // Août 2025
    { id: 170, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.96, created_at: '2025-08-01T08:45:00' },
    // { id: 171, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.91, created_at: '2025-08-08T09:55:00' },
    // { id: 172, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.60, created_at: '2025-08-15T11:05:00' },
    { id: 173, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-08-22T12:15:00' },
    // Septembre 2025
    { id: 180, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.95, created_at: '2025-09-05T08:50:00' },
    // { id: 181, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.92, created_at: '2025-09-12T10:00:00' },
    // { id: 182, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.61, created_at: '2025-09-19T11:10:00' },
    { id: 183, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.98, created_at: '2025-09-26T12:20:00' },
    // Octobre 2025
    { id: 190, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.96, created_at: '2025-10-03T08:55:00' },
    // { id: 191, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.93, created_at: '2025-10-10T10:05:00' },
    // { id: 192, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.62, created_at: '2025-10-17T11:15:00' },
    { id: 193, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.99, created_at: '2025-10-24T12:25:00' },
    // Novembre 2025
    { id: 200, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.95, created_at: '2025-11-07T09:00:00' },
    // { id: 201, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.91, created_at: '2025-11-14T10:10:00' },
    // { id: 202, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.60, created_at: '2025-11-21T11:20:00' },
    { id: 203, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-11-28T12:30:00' },
    // Décembre 2025
    { id: 210, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.96, created_at: '2025-12-05T09:05:00' },
    // { id: 211, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.92, created_at: '2025-12-12T10:15:00' },
    // { id: 212, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.61, created_at: '2025-12-19T11:25:00' },
    { id: 213, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.98, created_at: '2025-12-26T12:35:00' },
    { id: 1, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.95, created_at: '2025-11-22T08:15:00' },
    // { id: 2, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.92, created_at: '2025-11-22T09:30:00' },
    // { id: 3, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.60, created_at: '2025-11-22T10:00:00' },
    { id: 4, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.98, created_at: '2025-11-22T11:45:00' },
    { id: 5, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-11-22T12:10:00' },
    // { id: 6, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.90, created_at: '2025-11-22T13:20:00' },
    { id: 7, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-11-22T14:05:00' },
    // { id: 8, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.55, created_at: '2025-11-22T15:00:00' },
    { id: 9, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.93, created_at: '2025-11-22T16:30:00' },
    // { id: 10, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.91, created_at: '2025-11-22T17:45:00' },
    // Ajout de beaucoup plus de données pour la simulation
    { id: 11, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.96, created_at: '2025-11-21T08:10:00' },
    // { id: 12, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.93, created_at: '2025-11-21T09:40:00' },
    // { id: 13, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.62, created_at: '2025-11-21T10:20:00' },
    { id: 14, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.99, created_at: '2025-11-21T11:55:00' },
    // { id: 15, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.89, created_at: '2025-11-21T13:10:00' },
    { id: 16, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.94, created_at: '2025-11-21T14:15:00' },
    // { id: 17, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.58, created_at: '2025-11-21T15:30:00' },
    { id: 18, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.92, created_at: '2025-11-21T16:50:00' },
    // { id: 19, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.88, created_at: '2025-11-21T17:55:00' },
    { id: 20, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.95, created_at: '2025-11-20T08:20:00' },
    // { id: 21, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.92, created_at: '2025-11-20T09:50:00' },
    // { id: 22, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.61, created_at: '2025-11-20T10:30:00' },
    { id: 23, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.97, created_at: '2025-11-20T11:35:00' },
    // { id: 24, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.90, created_at: '2025-11-20T13:40:00' },
    { id: 25, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.96, created_at: '2025-11-20T14:25:00' },
    // { id: 26, event_type: 'rien', sensor_a: 0, sensor_b: 0, pir_state: 0, confidence: 0.57, created_at: '2025-11-20T15:10:00' },
    { id: 27, event_type: 'entrée', sensor_a: 1, sensor_b: 0, pir_state: 1, confidence: 0.91, created_at: '2025-11-20T16:40:00' },
    // { id: 28, event_type: 'sortie', sensor_a: 0, sensor_b: 1, pir_state: 1, confidence: 0.87, created_at: '2025-11-20T17:35:00' },
    // ... ajoutez encore plus de données si besoin
];
