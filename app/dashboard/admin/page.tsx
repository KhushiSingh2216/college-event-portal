"use client";

import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [registrations, setRegistrations] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");

  async function loadData() {
    const token = localStorage.getItem("token");

    const eventRes = await fetch("/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (eventRes.ok) {
      setEvents(await eventRes.json());
    }

    const announcementRes = await fetch("/api/announcements", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (announcementRes.ok) {
      setAnnouncements(await announcementRes.json());
    }
    const registrationRes = await fetch("/api/registrations", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

if (registrationRes.ok) {
  const registrationData = await registrationRes.json();
  setRegistrations(registrationData.length);
}
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createEvent() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      banner: "https://placehold.co/600x400",
      category: "General",
      venue: "College Auditorium",
      date,
      deadline: date,
      totalSeats: 100,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Event Created Successfully!");

  setTitle("");
  setDescription("");
  setDate("");

  loadData();
}

  async function createAnnouncement() {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: announcementTitle,
        message: announcementContent,
      }),
    });

    const data = await res.json();
console.log("Response:", data);
console.log("Title:", announcementTitle, "Message:", announcementContent);
    if (!res.ok) {
      alert(data.message);
      return;
    }

    setAnnouncementTitle("");
    setAnnouncementContent("");

    alert("Announcement Published!");
    loadData();
  }
async function deleteEvent(id: string) {
  if (!window.confirm("Delete this event?")) {
    return;
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    alert("Failed to delete event");
    return;
  }

  loadData();
}

 async function deleteAnnouncement(id: string) {
  if (!window.confirm("Delete this announcement?")) {
    return;
  }

  const token = localStorage.getItem("token");

  await fetch(`/api/announcements/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  loadData();
}

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-5 flex justify-between items-center shadow-xl">

  <div>
    <h1 className="text-3xl font-bold">
      🎓 College Event Portal
    </h1>

    <p className="text-sm text-blue-100">
      Admin Dashboard
    </p>
  </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-lg font-semibold shadow-md"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">
            <h3 className="font-bold text-xl">📅 Events</h3>
            <p className="text-5xl text-blue-600 mt-4 font-bold">
              {events.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">
            <h3 className="font-bold text-xl">
              📢 Announcements
            </h3>

            <p className="text-5xl text-red-500 mt-4 font-bold">
              {announcements.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">
            <h3 className="font-bold text-xl">
  🎟 Registrations
</h3>

<p className="text-5xl text-green-600 mt-4 font-bold">
  {registrations}
</p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">

            <h2 className="text-2xl font-bold mb-5">
              ➕ Create Event
            </h2>

            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="date"
              className="w-full border p-3 rounded-lg mb-5"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button
              onClick={createEvent}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              Create Event
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">

            <h2 className="text-2xl font-bold mb-5">
              📢 Create Announcement
            </h2>

            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Title"
              value={announcementTitle}
              onChange={(e) =>
                setAnnouncementTitle(e.target.value)
              }
            />

            <textarea
              className="w-full border p-3 rounded-lg mb-5"
              placeholder="Content"
              value={announcementContent}
              onChange={(e) =>
                setAnnouncementContent(e.target.value)
              }
            />

            <button
              onClick={createAnnouncement}
              className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              Publish
            </button>

          </div>

        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            📅 Events
          </h2>

          {events.map((event) => (
            <div
              key={event.id}
             className="border border-gray-200 rounded-xl p-5 flex justify-between items-center mb-4 hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {event.title}
                </h3>

                <p>{event.description}</p>
              </div>

              <button
                onClick={() => deleteEvent(event.id)}
                className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-lg font-semibold shadow-md"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            📢 Announcements
          </h2>

          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="border border-gray-200 rounded-xl p-5 flex justify-between items-center mb-4 hover:shadow-lg transition"
            >
              <div>
                <h3 className="font-bold">
                  {announcement.title}
                </h3>

                <p>{announcement.message}</p>
              </div>

              <button
                onClick={() =>
                  deleteAnnouncement(announcement.id)
                }
                className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>
      <footer className="text-center py-10 text-gray-500">
        <p className="font-semibold">
          Developed by Khushi Singh
        </p>

        <p className="text-sm mt-1">
          Built with Next.js • Prisma • PostgreSQL • Tailwind CSS
        </p>
      </footer>
    </div>
  );
}