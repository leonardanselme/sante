import Image from "next/image";
import Link from "next/link";
import ButtonLogin from "../components/ButtonLogin";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-md p-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">
            SantéApp
          </Link>
          <nav className="flex items-center">
            <ul className="flex space-x-4 mr-4">
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
            </ul>
            <ButtonLogin />
          </nav>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center p-8 pt-0">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Bienvenue sur SantéApp
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          Votre compagnon de santé personnel
        </p>
        <main className="flex flex-col items-center gap-8">
          <Image
            src="/health-app-logo.svg"
            alt="Logo de SantéApp"
            width={150}
            height={150}
            className="mb-8"
          />
          <p className="text-center text-gray-600 max-w-md">
            SantéApp vous aide à suivre vos objectifs de santé, à surveiller
            votre bien-être et à rester informé des dernières nouvelles en
            matière de santé.
          </p>
          <a
            href="/signup"
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
          >
            Commencez maintenant
          </a>
        </main>
        <footer className="mt-12 text-center text-gray-500">
          <p>© 2025 SantéApp. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
}
