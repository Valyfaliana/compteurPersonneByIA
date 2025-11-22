import "./App.css";
import NbrPeopleLive from "./components/NbrPeopleLive";
import MyCard from "./components/MyCard";
import { useEffect, useState } from "react";
import mqtt from "mqtt";
import MyLed from "./components/MyLed";
import MyProgressBar from "./components/MyProgressBar.jsx";
import MyGraph from "./components/MyGraph.jsx";

const serverBroker = import.meta.env.VITE_SERVER_BROKER;
const MQTT_TOPIC_NBR_PERSONNE = import.meta.env.VITE_TOPIC_NBR_PERSONNE;
const MQTT_TOPIC_BREAK_BEAM_A = import.meta.env.VITE_TOPIC_BREAK_BEAM_A;
const MQTT_TOPIC_BREAK_BEAM_B = import.meta.env.VITE_TOPIC_BREAK_BEAM_B;
const MQTT_TOPIC_PIR = import.meta.env.VITE_TOPIC_PIR;

function App() {
  const [people, setPeople] = useState("14");
  const [etatBeamA, setEtatBeamA] = useState(1);
  const [etatBeamB, setEtatBeamB] = useState(1);
  const [etatPir, setEtatPir] = useState(1);

  // useEffect(() => {
  //   // Connexion au broker
  //   const client = mqtt.connect(`${serverBroker}`);

  //   // Abonnement au topic
  //   client.on("connect", () => {
  //     console.log("Connecté au broker MQTT !");
  //     client.subscribe(MQTT_TOPIC_NBR_PERSONNE);
  //     client.subscribe(MQTT_TOPIC_BREAK_BEAM_A);
  //     client.subscribe(MQTT_TOPIC_BREAK_BEAM_B);
  //     client.subscribe(MQTT_TOPIC_PIR);
  //   });

  //   // Reception des messages
  //   client.on("message", (topic, message) => {
  //     switch (topic) {
  //       case MQTT_TOPIC_NBR_PERSONNE:
  //         setPeople(message.toString());
  //         break;
  //       case MQTT_TOPIC_BREAK_BEAM_A:
  //         setEtatBeamA(message.toString());
  //         break;
  //       case MQTT_TOPIC_BREAK_BEAM_B:
  //         setEtatBeamB(message.toString());
  //         break;
  //       case MQTT_TOPIC_PIR:
  //         setEtatPir(message.toString());
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   // Gestion des erreurs
  //   client.on("error", (err) => {
  //     console.error("Erreur MQTT:", err);
  //   });

  //   return () => {
  //     client.end();
  //   };
  // }, []);

  return (
    <div className="container-lg px-10 bg-gray-900 flex flex-col items-center overflow-y-auto">
      {/* Nombre en temps reel dans la piece */}
      <NbrPeopleLive count={people} size="lg" className="my-12" />

      <div className="flex flex-wrap justify-evenly w-full flex-col flex-row">
        {/* Etat des capteurs break beam */}
        <MyCard title="Capteur Break Beam" className="w-full md:w-1/4 mb-4 md:mb-0">
          <div className="flex flex-wrap justify-around content-center h-full">
            <MyLed value={etatBeamA} legend='A' />
            <MyLed value={etatBeamB} legend='B' />
          </div>
        </MyCard>

        {/* Etat capteur PIR */}
        <MyCard 
          title="Capteur PIRs" 
          className={`w-full md:w-1/4 mb-4 md:mb-0 transition-colors duration-500 ${etatPir && 'bg-gradient-to-br from-green-400/50 via-green-500/50 to-green-700/50'}`}>
          <span className="text-6xl font-semibold italic flex flex-wrap content-center h-full">
            {etatPir ? "Mouvement" : "Rien"}
          </span>
        </MyCard>

        {/* Probabilite IA */}
        <MyCard title="Probabilite IA" className="w-full md:w-1/4">
          <div className="flex flex-col items-center justify-between w-full">
            {/* Entrer */}
            <div className="flex items-center w-full mb-4">
              <span className="w-20 text-right mr-2">Entrer :</span>
              <MyProgressBar value={75} color="green" largeur="w-11/12" />
              <span className="w-20">&nbsp;80%</span>
            </div>
            {/* Rien */}
            <div className="flex items-center w-full mb-4">
              <span className="w-20 text-right mr-2">Rien :</span>
              <MyProgressBar value={44.3} color="yellow" largeur="w-11/12" />
              <span className="w-20">&nbsp;44.3%</span>
            </div>
            {/* Sortie */}
            <div className="flex items-center w-full mb-4">
              <span className="w-20 text-right mr-2">Sortie :</span>
              <MyProgressBar value={33.2} color="red" largeur="w-11/12" />
              <span className="w-20">&nbsp;33.2%</span>
            </div>
          </div>
        </MyCard>
      </div>

      {/* Graph de frequentation */}
      <MyGraph />

      <button type="button" onClick={() => setEtatPir(etatPir ? 0 : 1)}>Cliquer</button>
    </div>
  );
}

export default App;
