import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";

export default function Home() {
  return (
  <>
    <Navbar />
    <Hero />

    <section className="bg-gray-100 py-20 px-8">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Upcoming Events
      </h2>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  </>
);
}