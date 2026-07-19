export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white px-10 py-5 shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">
        EventHub
      </h1>

      <div className="flex gap-8">
        <a href="#">Home</a>
        <a href="#">Events</a>
        <a href="#">Announcements</a>
      </div>

      <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Login
      </button>
    </nav>
  );
}