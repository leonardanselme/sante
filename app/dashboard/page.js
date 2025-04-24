"use client"; // Indique que c'est un Client Component

import Link from "next/link";
import Image from "next/image"; // Assurez-vous d'importer Image si vous l'utilisez dans le contenu réel du dashboard
import ButtonLogin from "../../components/ButtonLogin"; // Import du bouton
import Journal from "../../components/Journal"; // Import du composant Journal
import Carnet from "../../components/Carnet";

export default function DashboardPage() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Colonne 1: Utilisation du composant Carnet */}
          <Carnet />

          {/* Colonne 2: Journal de Repas (utilisation du composant) */}
          <Journal />
        </div>
      </main>

      {/* Footer (optionnel, peut être dans un layout global) */}
      <footer className="w-full text-center text-gray-500 p-4 mt-8">
        <p>© 2025 SantéApp. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
