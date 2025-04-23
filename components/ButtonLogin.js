import Link from "next/link";

export default function ButtonLogin() {
  return (
    <Link
      href="/dashboard"
      className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
    >
      Dashboard
    </Link>
  );
}
