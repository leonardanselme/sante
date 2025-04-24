"use client";

import { useState, useMemo } from "react";
// Import de Recharts pour le PieChart
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// Import des données alimentaires
import { FOOD_DATA } from "../data/aliments.js";

const COLORS = { protein: "#DC2626", carbs: "#FACC15", fat: "#2563EB" }; // Rouge, Jaune, Bleu

export default function Journal() {
  // État pour la date sélectionnée pour l'affichage
  const [selectedJournalDate, setSelectedJournalDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // État pour suivre les aliments *ajoutés* pour chaque date
  // La structure stocke maintenant le nom de l'aliment ajouté
  const [addedMeals, setAddedMeals] = useState([
    // Données d'exemple: l'utilisateur a ajouté ces aliments spécifiques ces jours-là
    { id: 1, date: "2023-11-01", foodName: "Poulet grillé (100g)" },
    { id: 2, date: "2023-11-01", foodName: "Riz blanc cuit (100g)" },
    { id: 3, date: "2023-11-02", foodName: "Pomme (moyenne)" },
    {
      id: 4,
      date: new Date().toISOString().split("T")[0],
      foodName: "Oeuf dur",
    },
  ]);

  // État pour le sélecteur d'aliments prédéfinis
  const [selectedFoodToAdd, setSelectedFoodToAdd] = useState(
    FOOD_DATA[0]?.name || ""
  );

  // Handler pour ajouter un aliment prédéfini sélectionné au journal
  const handleAddPredefinedFood = (e) => {
    e.preventDefault();
    if (!selectedFoodToAdd) return;

    const newMealEntry = {
      id: Date.now(),
      date: selectedJournalDate,
      foodName: selectedFoodToAdd,
    };

    setAddedMeals(
      [...addedMeals, newMealEntry].sort(
        (a, b) => new Date(a.date) - new Date(b.date) || b.id - a.id
      )
    );
    // Optionnel: Réinitialiser le sélecteur ?
    // setSelectedFoodToAdd(FOOD_DATA[0]?.name || '');
  };

  // Calcul des macros et calories pour la date sélectionnée (mémoïsé pour la performance)
  const dailyTotals = useMemo(() => {
    const mealsForDate = addedMeals.filter(
      (meal) => meal.date === selectedJournalDate
    );
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    mealsForDate.forEach((meal) => {
      const foodDetails = FOOD_DATA.find((f) => f.name === meal.foodName);
      if (foodDetails) {
        totalCalories += foodDetails.calories || 0;
        totalProtein += foodDetails.protein || 0;
        totalCarbs += foodDetails.carbs || 0;
        totalFat += foodDetails.fat || 0;
      }
    });

    // Arrondir les totaux pour un affichage plus propre
    totalProtein = Math.round(totalProtein * 10) / 10;
    totalCarbs = Math.round(totalCarbs * 10) / 10;
    totalFat = Math.round(totalFat * 10) / 10;

    const macroDataForChart = [
      { name: "Protéines", value: totalProtein, color: COLORS.protein },
      { name: "Glucides", value: totalCarbs, color: COLORS.carbs },
      { name: "Lipides", value: totalFat, color: COLORS.fat },
    ].filter((macro) => macro.value > 0); // Ne pas afficher les macros à 0 dans le chart

    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      macroDataForChart,
      mealsForDate,
    };
  }, [addedMeals, selectedJournalDate]);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString + "T00:00:00").toLocaleDateString(
      "fr-FR",
      options
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col h-full">
      {" "}
      {/* flex flex-col h-full pour layout */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Journal de Repas
      </h2>
      {/* Sélecteur de date */}
      <div className="mb-4">
        <label
          htmlFor="journalDateSelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Afficher le journal pour le :
        </label>
        <input
          type="date"
          id="journalDateSelect"
          value={selectedJournalDate}
          onChange={(e) => setSelectedJournalDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* Graphique Camembert Macronutriments */}
      <div className="mb-6 h-64">
        {" "}
        {/* Hauteur fixe pour le conteneur du graphique */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
          Répartition Macronutriments (g)
        </h3>
        {dailyTotals.macroDataForChart.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dailyTotals.macroDataForChart}
                cx="50%"
                cy="45%"
                labelLine={false}
                outerRadius={75}
                fill="#8884d8"
                dataKey="value"
              >
                {dailyTotals.macroDataForChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} g`, name]} />
              <Legend verticalAlign="bottom" align="center" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50 rounded-md">
            <p>Aucune donnée macro pour cette date.</p>
          </div>
        )}
      </div>
      {/* Formulaire d'ajout d'aliments prédéfinis */}
      <form
        onSubmit={handleAddPredefinedFood}
        className="space-y-3 mb-6 border-t pt-6"
      >
        <h3 className="text-lg font-medium text-gray-900">
          Ajouter un aliment pour le {formatDate(selectedJournalDate)}
        </h3>
        <div>
          <label
            htmlFor="foodSelect"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Choisir un aliment :
          </label>
          <select
            id="foodSelect"
            value={selectedFoodToAdd}
            onChange={(e) => setSelectedFoodToAdd(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {FOOD_DATA.map((food) => (
              <option key={food.name} value={food.name}>
                {food.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={!selectedFoodToAdd} // Désactiver si aucun aliment n'est sélectionnable
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Ajouter l&apos;aliment sélectionné
        </button>
      </form>
      {/* Affichage du journal des aliments ajoutés */}
      <div className="flex-grow flex flex-col">
        {" "}
        {/* flex-grow pour prendre l'espace restant */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aliments enregistrés ({formatDate(selectedJournalDate)})
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Total calories:{" "}
          <span className="font-semibold">
            {dailyTotals.totalCalories} kcal
          </span>{" "}
          | P:{" "}
          <span className="font-semibold text-red-600">
            {dailyTotals.totalProtein}g
          </span>{" "}
          | G:{" "}
          <span className="font-semibold text-yellow-600">
            {dailyTotals.totalCarbs}g
          </span>{" "}
          | L:{" "}
          <span className="font-semibold text-blue-600">
            {dailyTotals.totalFat}g
          </span>
        </p>
        <ul className="space-y-2 flex-grow overflow-y-auto border p-2 rounded-md">
          {" "}
          {/* flex-grow overflow-y-auto */}
          {dailyTotals.mealsForDate.length > 0 ? (
            dailyTotals.mealsForDate.map((meal) => (
              // Affiche juste le nom de l'aliment ajouté
              <li key={meal.id} className="text-sm border-b pb-1">
                {meal.foodName}
                {/* On pourrait ajouter un bouton supprimer ici */}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">
              Aucun aliment enregistré pour cette date.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
