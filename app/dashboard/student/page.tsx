"use client";

import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  venue: string;
  availableSeats: number;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function StudentDashboard() {
const [events, setEvents] = useState<Event[]>([]);
const [announcements, setAnnouncements] = useState<Announcement[]>([]);
const [registeredCount, setRegisteredCount] = useState(0);
const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Fetch Events
      const eventRes = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!eventRes.ok) {
        throw new Error("Failed to fetch events");
      }

      const eventData = await eventRes.json();
      setEvents(eventData);

      // Fetch Registrations
      const registrationRes = await fetch(
        `/api/registrations?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     if (registrationRes.ok) {
  const registrationData = await registrationRes.json();

  setRegisteredCount(registrationData.length);

  setRegisteredEvents(
    registrationData.map((registration: any) => registration.eventId)
  );
}

      // Fetch Announcements
      const announcementRes = await fetch("/api/announcements", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (announcementRes.ok) {
        const announcementData = await announcementRes.json();
        setAnnouncements(announcementData);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function registerEvent(eventId: string) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          eventId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("🎉 Registration Successful!");

      loadDashboard();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-5 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          🎓 Student Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>

      <div className="p-8">

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome 👋
        </h2>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold">
              📅 Total Events
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-4">
              {loading ? "..." : events.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold">
              🎫 Registered Events
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-4">
              {loading ? "..." : registeredCount}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold">
              📢 Announcements
            </h3>

            <p className="text-4xl font-bold text-red-500 mt-4">
              {loading ? "..." : announcements.length}
            </p>
          </div>

        </div>

        {/* Events */}
        <div className="bg-white mt-10 rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-6">
            Upcoming Events
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            <div className="space-y-5">
              {events.map((event) => (
  <div
    key={event.id}
    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
  >
    <div className="flex justify-between items-start">
      <h3 className="text-2xl font-bold text-blue-700">
        {event.title}
      </h3>

      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
        {event.category}
      </span>
    </div>

    <p className="mt-3 text-gray-700">
      {event.description}
    </p>

    <div className="mt-5 space-y-2 text-gray-700">
      <p>
        📅 <span className="font-medium">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </p>

      <p>
        📍 <span className="font-medium">
          {event.venue}
        </span>
      </p>

      <p>
        👥 <span className="font-medium">
          Seats Left: {event.availableSeats}
        </span>
      </p>
    </div>

   {registeredEvents.includes(event.id) ? (
  <button
    disabled
    className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
  >
    ✅ Registered
  </button>
) : (
  <button
    onClick={() => registerEvent(event.id)}
    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
  >
    Register
  </button>
)}
  </div>
))}
            </div>
          )}

        </div>

        {/* Announcements */}
        <div className="bg-white mt-8 rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-6">
            📢 Latest Announcements
          </h2>

          {announcements.length === 0 ? (
            <p className="text-gray-500">
              No announcements available.
            </p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border rounded-lg p-4"
                >
                  <h3 className="text-lg font-bold text-red-600">
                    {announcement.title}
                  </h3>

                  <p className="mt-2 text-gray-700">
                    {announcement.message}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(
                      announcement.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}