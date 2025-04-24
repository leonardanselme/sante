"use client";

import { useState } from "react";
import PerformanceChart from "./PerformanceChart"; // Importe le composant graphique

const EXERCISES = ["Curl Biceps", "Overhead Press"]; // Peut être passé en prop si besoin

// Changement du nom de la fonction ici
export default function Carnet() {
  // États pour le suivi performance
  const [perfDate, setPerfDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [weight, setWeight] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(EXERCISES[0]);
  const [performanceData, setPerformanceData] = useState({
    "Curl Biceps": [
      { date: "2023-10-01", weight: 10 },
      { date: "2023-10-08", weight: 12 },
      { date: "2023-10-15", weight: 11 },
      { date: "2023-10-22", weight: 13 },
    ],
    "Overhead Press": [
      { date: "2023-10-03", weight: 30 },
      { date: "2023-10-10", weight: 32 },
      { date: "2023-10-17", weight: 35 },
      { date: "2023-10-24", weight: 34 },
    ],
  });

  const handleAddPerformance = (e) => {
    e.preventDefault();
    if (!perfDate || !weight || !selectedExercise) return;
    const newEntry = { date: perfDate, weight: parseFloat(weight) };
    setPerformanceData((prevData) => ({
      ...prevData,
      [selectedExercise]: [
        ...(prevData[selectedExercise] || []),
        newEntry,
      ].sort((a, b) => new Date(a.date) - new Date(b.date)),
    }));
    setWeight("");
  };

  // Données pour le graphique
  const chartData = performanceData[selectedExercise] || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Sélecteur d'exercice */}
      <div className="mb-4">
        <label
          htmlFor="exercise-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Choisir l&apos;exercice :
        </label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
        >
          {EXERCISES.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Suivi Performance - {selectedExercise}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Partie Formulaire Performance */}
        <div>
          <form onSubmit={handleAddPerformance} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Ajouter une nouvelle performance
            </h3>
            <div>
              <label
                htmlFor="perfDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="perfDate"
                value={perfDate}
                onChange={(e) => setPerfDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Poids soulevé (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 15"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
                step="0.1"
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Ajouter pour {selectedExercise}
            </button>
          </form>
        </div>

        {/* Partie Graphique Performance */}
        <PerformanceChart data={chartData} />
      </div>
    </div>
  );
}
