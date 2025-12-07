import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AreaChart, Area } from "recharts";
// import { staticEventsData } from "../data/db_statique";

// Données statiques simulant la table events
// const staticEvents = staticEventsData;

const timeScales = [
  { label: "Heure", value: "hour" },
  { label: "Jour", value: "day" },
  { label: "Mois", value: "month" },
];

function groupEvents(events, scale) {
  events = [...events].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const grouped = {};
  const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  events.forEach((event) => {
    let key;
    let sortKey; // Clé numérique pour le tri
    const date = new Date(event.created_at);

    if (scale === "hour") {
      const hours = date.getHours();
      key = String(hours).padStart(2, "0") + ":00";
      sortKey = hours;
    } else if (scale === "day") {
      const dayOfWeek = date.getDay();
      key = daysOfWeek[dayOfWeek];
      sortKey = dayOfWeek;
    } else if (scale === "month") {
      key =
        date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
      sortKey = date.getFullYear() * 12 + date.getMonth();
    }

    if (!grouped[key]) {
      grouped[key] = {
        count: 0,
        entree: 0,
        sortie: 0,
        rien: 0,
        confidence: 0,
        key,
        sortKey,
      };
    }

    grouped[key].count++;
    if (event.event_type === "entree")
      grouped[key].entree = (grouped[key].entree || 0) + 1;
    if (event.event_type === "sortie")
      grouped[key].sortie = (grouped[key].sortie || 0) + 1;
    if (event.event_type === "rien")
      grouped[key].rien = (grouped[key].rien || 0) + 1;
    grouped[key].confidence += event.confidence;
  });

  // Trier par sortKey (numérique) et convertir en array
  return Object.values(grouped)
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((g) => ({
      ...g,
      confidence: g.count ? (g.confidence / g.count).toFixed(2) : 0,
    }));
}

const MyGraph = ({ dataProps }) => {
  const [scale, setScale] = useState("hour");
  const data = groupEvents(dataProps, scale);

  return (
    <div className="bg-white/9 backdrop-blur-sm w-full md:w-9/12 shadow-xl rounded-xl p-6 mx-auto mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-2xl font-bold text-white">
          Statistiques des événements
        </h2>
        <div>
          <label className="mr-2 font-medium text-white">
            Échelle de temps :
          </label>
          <select
            className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400 text-white"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
          >
            {timeScales.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorEntree" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorSortie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" tick={{ fontSize: 13, fill: "#fff" }} />
          <YAxis allowDecimals={false} tick={{ fill: "#fff" }} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="entree"
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#colorEntree)"
            name="Entrée"
          />
          {scale === "hour" && (
            <Area
              type="monotone"
              dataKey="sortie"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorSortie)"
              name="Sortie"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-6">
        <h3 className="font-semibold text-white mb-2">
          Confiance moyenne par période
        </h3>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="key" hide tick={{ fill: "#fff" }} />
            <YAxis domain={[0, 1]} tick={{ fill: "#fff" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyGraph;
