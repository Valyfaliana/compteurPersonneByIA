import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import MyCard from "./components/MyCard";
import MyGraph from "./components/MyGraph";
import MyLed from "./components/MyLed";
import MyProgressBar from "./components/MyProgressBar";
import NbrPeopleLive from "./components/NbrPeopleLive";
import { useNavigate } from "react-router-dom";
import mqtt from "mqtt";
import { useAuth } from "./utils/hooks/AuthProvider";

const serverBroker = import.meta.env.VITE_SERVER_BROKER;
const MQTT_TOPIC_NBR_PERSONNE = import.meta.env.VITE_TOPIC_NBR_PERSONNE;
const MQTT_TOPIC_CAPTEURS = import.meta.env.VITE_TOPIC_CAPTEURS;
const MQTT_TOPIC_IA = import.meta.env.VITE_TOPIC_IA;

const Dashboard = () => {
  const nav = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("Déconnexion...");
    logout();
    nav("/");
  };

  return (
    <div className="container-lg p-10 bg-gray-900 h-screen flex flex-col items-center overflow-y-auto relative">
      {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2.5 bg-transparent hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
          title="Déconnexion re olona"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>

        {/* Data temps reel */}
      <PartieTempsReel />
      
      {/* Graph de frequentation */}
      <MyGraph />
    </div>
  );
};

const PartieTempsReel = () => {
  const [people, setPeople] = useState("0");

  // Etat capteurs
  const [etatBeamA, setEtatBeamA] = useState(1);
  const [etatBeamB, setEtatBeamB] = useState(1);
  const [etatPir, setEtatPir] = useState(1);

  // Probabiliter IA
  const [probaEntree, setProbaEntree] = useState(0.0);
  const [probaRien, setProbaRien] = useState(0.0);
  const [probaSortie, setProbaSortie] = useState(0.0);

  useEffect(() => {
    // Connexion au broker
    const client = mqtt.connect(`${serverBroker}`);

    // Abonnement au topic
    client.on("connect", () => {
      console.log("Connecté au broker MQTT !");
      client.subscribe(MQTT_TOPIC_CAPTEURS);
      client.subscribe(MQTT_TOPIC_NBR_PERSONNE);
      client.subscribe(MQTT_TOPIC_IA);
    });

    // Reception des messages
    client.on("message", (topic, message) => {
      switch (topic) {
        case MQTT_TOPIC_NBR_PERSONNE:
          setPeople(message.toString());
          break;
        case MQTT_TOPIC_CAPTEURS: {
          const json = JSON.parse(message.toString());
          setEtatBeamA(Number(json.beamA));
          setEtatBeamB(Number(json.beamB));
          setEtatPir(Number(json.pir));
          break;
        }
        case MQTT_TOPIC_IA: {
          const json = JSON.parse(message.toString());
          setProbaEntree(json.entree);
          setProbaRien(json.rien);
          setProbaSortie(json.sortie);
          break;
        }
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
    <>
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
            "bg-gradient-to-br from-blue-400/70 via-blue-500/70 to-blue-700/70"
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
              <MyProgressBar
                value={probaEntree * 100}
                color="blue"
                largeur="w-11/12"
              />
              <span className="w-20">
                &nbsp;{(probaEntree * 100).toFixed(2)}%
              </span>
            </div>
            {/* Rien */}
            <div className="flex items-center w-full mb-4">
              <span className="w-20 text-right mr-2">Rien :</span>
              <MyProgressBar
                value={probaRien * 100}
                color="purple"
                largeur="w-11/12"
              />
              <span className="w-20">
                &nbsp;{(probaRien * 100).toFixed(2)}%
              </span>
            </div>
            {/* Sortie */}
            <div className="flex items-center w-full mb-4">
              <span className="w-20 text-right mr-2">Sortie :</span>
              <MyProgressBar
                value={probaSortie * 100}
                color="red"
                largeur="w-11/12"
              />
              <span className="w-20">
                &nbsp;{(probaSortie * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </MyCard>
      </div>
    </>
  );
};

export default Dashboard;
