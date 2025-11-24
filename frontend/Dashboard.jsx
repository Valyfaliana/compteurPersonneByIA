import { useState } from "react";
import { LogOut } from "lucide-react";
import MyCard from "./src/components/MyCard";
import MyGraph from "./src/components/MyGraph";
import MyLed from "./src/components/MyLed";
import MyProgressBar from "./src/components/MyProgressBar";
import NbrPeopleLive from "./src/components/NbrPeopleLive";
import { useNavigate } from "react-router-dom";

const serverBroker = import.meta.env.VITE_SERVER_BROKER;
const MQTT_TOPIC_NBR_PERSONNE = import.meta.env.VITE_TOPIC_NBR_PERSONNE;
const MQTT_TOPIC_BREAK_BEAM_A = import.meta.env.VITE_TOPIC_BREAK_BEAM_A;
const MQTT_TOPIC_BREAK_BEAM_B = import.meta.env.VITE_TOPIC_BREAK_BEAM_B;
const MQTT_TOPIC_PIR = import.meta.env.VITE_TOPIC_PIR;

const Dashboard = () => {
  const [people, setPeople] = useState("14");
  const [etatBeamA, setEtatBeamA] = useState(1);
  const [etatBeamB, setEtatBeamB] = useState(1);
  const [etatPir, setEtatPir] = useState(1);
  const nav = useNavigate();

  const handleLogout = () => {
    console.log("Déconnexion...");
    // Ajouter votre logique de déconnexion ici
    // Par exemple : clearAuthToken(), redirect to login, etc.
    nav("/");
  };

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
    <div className="container-lg p-10 bg-gray-900 h-screen flex flex-col items-center overflow-y-auto relative">
    {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
          title="Déconnexion"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>

        {/* Nombre en temps reel dans la piece */}
      <div className="mb-10">
        <NbrPeopleLive count={people} size="lg" />
      </div>

      <div className="flex flex-wrap justify-evenly w-full flex-col flex-row">
        {/* Etat des capteurs break beam */}
        <MyCard
          title="Capteur Break Beam"
          className="w-full md:w-1/4 mb-4 md:mb-0"
        >
          <div className="flex flex-wrap justify-around content-center h-full">
            <MyLed value={etatBeamA} color="blue" legend="A" />
            <MyLed value={etatBeamB} color="blue" legend="B" />
          </div>
        </MyCard>

        {/* Etat capteur PIR */}
        <MyCard
          title="Capteur PIRs"
          className={`w-full md:w-1/4 mb-4 md:mb-0 transition-colors duration-500 ${
            etatPir &&
            "bg-gradient-to-br from-blue-400/50 via-blue-500/50 to-blue-700/50"
          }`}
        >
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
              <MyProgressBar value={75} color="blue" largeur="w-11/12" />
              <span className="w-20">&nbsp;80%</span>
            </div>
            {/* Rien */}
            <div className="flex items-center w-full mb-4">
              <span className="w-20 text-right mr-2">Rien :</span>
              <MyProgressBar value={44.3} color="purple" largeur="w-11/12" />
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
    </div>
  );
};

export default Dashboard;
