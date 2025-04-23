"use client"; // Indique que c'est un Client Component

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Assurez-vous d'importer Image si vous l'utilisez dans le contenu réel du dashboard
import ButtonLogin from "../../components/ButtonLogin"; // Import du bouton
// Import du nouveau composant graphique
import PerformanceChart from "../../components/PerformanceChart";

const EXERCISES = ["Curl Biceps", "Overhead Press"]; // Liste des exercices

export default function DashboardPage() {
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

  // États pour le journal de repas
  const [mealDate, setMealDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [meals, setMeals] = useState([
    // Données d'exemple
    { id: 1, date: "2023-11-01", item: "Poulet grillé", calories: 350 },
    { id: 2, date: "2023-11-01", item: "Salade composée", calories: 250 },
    { id: 3, date: "2023-11-02", item: "Pâtes bolognaise", calories: 500 },
  ]);

  const handleAddPerformance = (e) => {
    e.preventDefault();
    if (!perfDate || !weight || !selectedExercise) return;

    const newEntry = {
      date: perfDate,
      weight: parseFloat(weight),
    };

    // Met à jour les données pour l'exercice sélectionné
    setPerformanceData((prevData) => {
      const currentExerciseData = prevData[selectedExercise] || [];
      const updatedExerciseData = [...currentExerciseData, newEntry].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      return {
        ...prevData,
        [selectedExercise]: updatedExerciseData,
      };
    });

    setWeight("");
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!mealDate || !foodItem || !calories) return;
    const newMeal = {
      id: Date.now(), // Simple ID unique
      date: mealDate,
      item: foodItem,
      calories: parseInt(calories, 10),
    };
    setMeals(
      [...meals, newMeal].sort(
        (a, b) => new Date(a.date) - new Date(b.date) || b.id - a.id
      )
    ); // Tri par date puis ID
    setFoodItem("");
    setCalories("");
  };

  // Données à passer au graphique, basées sur l'exercice sélectionné
  const chartData = performanceData[selectedExercise] || [];

  // Calcul des calories pour une date donnée (exemple pour aujourd'hui)
  // TODO: Ajouter un sélecteur de date pour le journal
  const today = new Date().toISOString().split("T")[0];
  const totalCaloriesToday = meals
    .filter((meal) => meal.date === today)
    .reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header intégré directement */}
      <header className="w-full bg-white shadow-md p-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">
            SantéApp
          </Link>
          <nav className="flex items-center">
            {" "}
            {/* Utilisation de flex pour aligner les liens et le bouton */}
            <ul className="flex space-x-4 mr-4">
              {" "}
              {/* Ajout de marge à droite des liens */}
              <li>
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-green-600"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-600"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-600"
                >
                  Contact
                </Link>
              </li>
              {/* Le lien texte Dashboard est retiré, remplacé par le bouton */}
            </ul>
            <ButtonLogin /> {/* Ajout du bouton Dashboard */}
          </nav>
        </div>
      </header>
      {/* Fin du Header intégré */}

      {/* Contenu principal du Dashboard */}
      <main className="container mx-auto p-8 pt-0 flex-grow w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Votre Tableau de Bord Santé
        </h1>

        {/* Layout en grille pour les deux sections principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne 1: Suivi Performance */}
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
              {" "}
              {/* items-start pour aligner en haut */}
              {/* Partie Formulaire */}
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
                      step="0.1" // Permet les décimales si besoin
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
              {/* Partie Graphique - Utilisation du composant dédié */}
              <PerformanceChart data={chartData} />
            </div>
          </div>

          {/* Colonne 2: Journal de Repas */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Journal de Repas
            </h2>

            {/* Formulaire d'ajout de repas */}
            <form onSubmit={handleAddMeal} className="space-y-4 mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Ajouter un aliment/repas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="mealDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="mealDate"
                    value={mealDate}
                    onChange={(e) => setMealDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="foodItem"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Aliment/Repas
                  </label>
                  <input
                    type="text"
                    id="foodItem"
                    value={foodItem}
                    onChange={(e) => setFoodItem(e.target.value)}
                    placeholder="Ex: Pomme"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="calories"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Ex: 95"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Ajouter au journal
              </button>
            </form>

            {/* Affichage du journal (liste simple pour l'instant) */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Repas enregistrés (Aujourd&apos;hui)
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Total calories aujourd&apos;hui :{" "}
                <span className="font-semibold">{totalCaloriesToday} kcal</span>
              </p>
              <ul className="space-y-2 max-h-60 overflow-y-auto border p-2 rounded-md">
                {meals.filter((meal) => meal.date === today).length > 0 ? (
                  meals
                    .filter((meal) => meal.date === today)
                    .map((meal) => (
                      <li
                        key={meal.id}
                        className="flex justify-between text-sm border-b pb-1"
                      >
                        <span>{meal.item}</span>
                        <span>{meal.calories} kcal</span>
                      </li>
                    ))
                ) : (
                  <li className="text-sm text-gray-500">
                    Aucun repas enregistré pour aujourd&apos;hui.
                  </li>
                )}
              </ul>
              {/* TODO: Ajouter la possibilité de voir/filtrer par d'autres dates */}
            </div>
          </div>
        </div>
      </main>

      {/* Footer (optionnel, peut être dans un layout global) */}
      <footer className="w-full text-center text-gray-500 p-4 mt-8">
        <p>© 2025 SantéApp. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
