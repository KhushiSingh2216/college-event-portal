export default function EventCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      
      <img
        src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
        alt="Event"
        className="h-52 w-full object-cover"
      />

      <div className="p-6">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          Tech
        </span>

        <h2 className="mt-4 text-2xl font-bold">
          Tech Fest 2026
        </h2>

        <p className="mt-3 text-gray-600">
          Join India's biggest college technology festival with coding
          competitions, hackathons, AI workshops and exciting prizes.
        </p>

        <div className="mt-5 space-y-2 text-gray-700">

          <p>📅 25 July 2026</p>

          <p>🕒 10:00 AM</p>

          <p>📍 Main Auditorium</p>

          <p>💺 Seats Left: 120</p>

        </div>

        <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
          Register Now
        </button>

      </div>

    </div>
  );
}