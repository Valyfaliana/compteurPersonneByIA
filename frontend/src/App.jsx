import "./App.css";
import NbrPeopleLive from "./components/NbrPeopleLive";
import MyCard from "./components/MyCard";
import { useEffect, useState } from "react";
import mqtt from "mqtt";

const serverBroker = import.meta.env.VITE_SERVER_BROKER;
const MQTT_TOPIC_NBR_PERSONNE = "nombre/personnes";
const MQTT_TOPIC_INTENSITE_A = "etat/break/beam/A";
const MQTT_TOPIC_INTENSITE_B = "etat/break/beam/B";

function App() {
  const [people, setPeople] = useState("...");
  const [intensiteLumA, setIntensiteLumA] = useState(0);
  const [intensiteLumB, setIntensiteLumB] = useState(0);

  useEffect(() => {
    // Connexion au broker
    const client = mqtt.connect(`ws://${serverBroker}:9001`);

    // Abonnement au topic
    client.on("connect", () => {
      console.log("Connecté au broker MQTT !");
      client.subscribe(MQTT_TOPIC_NBR_PERSONNE);
      client.subscribe(MQTT_TOPIC_INTENSITE_A);
      client.subscribe(MQTT_TOPIC_INTENSITE_B);
    });

    // Reception des messages
    client.on("message", (topic, message) => {
      switch (topic) {
        case MQTT_TOPIC_NBR_PERSONNE:
          setPeople(message.toString());
          break;
        case MQTT_TOPIC_INTENSITE_A:
          setIntensiteLumA(message.toString());
          break;
        case MQTT_TOPIC_INTENSITE_B:
          setIntensiteLumB(message.toString());
          break;
        default:
          break;
      }
    });

    // Gestion des erreurs
    client.on("error", (err) => {
      console.error("Erreur MQTT:", err);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="px-10 bg-gray-900 w-screen h-screen flex flex-col items-center">
      {/* Nombre de personnes en temps reel */}
      <MyCard className="flex flex-col items-center p-8 mt-4 w-full">
        <span className="text-3xl font-semibold tracking-tight mb-3">
          Nombre de personnes
        </span>
        <NbrPeopleLive count={people} size="lg" />
      </MyCard>

      {/* Intensite lumineux capteurs */}
      <div className="flex justify-between mt-4 w-full">
        {/* Capteur A */}
        <MyCard className="w-full mr-1 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800">
          <h1 className="text-xl text-gray-300 mb-4">Capteur A</h1>
          <span className="text-5xl font-semibold">
            {intensiteLumA} <small className="text-sm">lux.</small>
          </span>
        </MyCard>
        {/* Capteur B */}
        <MyCard className="w-full ml-1 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800">
          <h1 className="text-xl text-gray-300 mb-4">Capteur B</h1>
          <span className="text-5xl font-semibold">
            {intensiteLumB} <small className="text-sm">lux.</small>
          </span>
        </MyCard>
      </div>
    </div>
  );
}

export default App;
