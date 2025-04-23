"use client"; // Les composants Recharts nécessitent souvent d'être dans un client component

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

// Le composant accepte les données du graphique via la prop `data`
export default function PerformanceChart({ data }) {
  // Gestion du cas où il n'y a pas de données pour éviter les erreurs Recharts
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[300px] bg-gray-50 p-4 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
        <p className="text-gray-500">
          Aucune donnée à afficher pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      {" "}
      {/* Conteneur avec hauteur fixe */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data} // Utilisation de la prop `data`
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "Kg", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#10B981"
            name="Poids (kg)"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
