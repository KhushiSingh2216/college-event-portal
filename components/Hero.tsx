export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-blue-50 px-6 text-center">
      <h1 className="text-6xl font-extrabold text-blue-700">
        College Event Portal
      </h1>

      <p className="mt-6 max-w-2xl text-xl text-gray-600">
        Discover exciting college events, register instantly, receive updates,
        and never miss an opportunity.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700">
          Explore Events
        </button>

        <button className="rounded-lg border border-blue-600 px-8 py-3 text-blue-600 hover:bg-blue-100">
          Learn More
        </button>
      </div>
    </section>
  );
}