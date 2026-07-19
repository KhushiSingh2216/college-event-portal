import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white px-10 py-5 shadow-md">
      <Link
        href="/"
        className="text-2xl font-bold text-blue-600"
      >
        EventHub
      </Link>

      <div className="flex gap-8 font-medium">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>

        <Link href="/events" className="hover:text-blue-600">
          Events
        </Link>

        <Link
          href="/dashboard/student"
          className="hover:text-blue-600"
        >
          Announcements
        </Link>
      </div>

      <Link
        href="/login"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
      >
        Login
      </Link>
    </nav>
  );
}