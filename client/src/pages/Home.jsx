import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import eventStore from "../store/eventStore";
import EventHero from "../assets/event-hero.png";

const Homepage = () => {
  const { events, fetchEvents, loading } = eventStore();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

 useEffect(() => {
  fetchEvents(true); // onlyUpcoming = true
}, [fetchEvents]);


  const eventsArray = Array.isArray(events) ? events : [];

  const filteredEvents = eventsArray.filter((event) => {
    return (
      (category === "" || event.category === category) &&
      (location === "" ||
        event.location.toLowerCase().includes(location.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* HERO / BANNER */}
      <section className="bg-slate-900">
  <div className="max-w-7xl mx-auto px-6 pt-14 pb-20 flex flex-col md:flex-row items-center justify-between gap-10">
    
    {/* Text Content */}
    <div className="max-w-2xl text-center md:text-left">
      <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
        Discover and manage events effortlessly
      </h1>
      <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
        Browse upcoming events, filter by category or location, and stay
        connected with what matters around you.
      </p>

      {/* CTA Button */}
      <div className="mt-6">
        <a
          href="/register"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
        >
          Create an Account
        </a>
      </div>
    </div>

    {/* Optional Illustration or Graphic */}
    <div className="hidden md:block flex-1">
      <img
        src={EventHero}
        alt="Events illustration"
        className="w-full h-auto rounded-lg shadow-xl"
      />
    </div>

  </div>
</section>

      {/* FILTERS */}
      <div className="relative -mt-10 px-4">
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 max-w-6xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-1/3 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="">All categories</option>
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Conference">Conference</option>
            </select>

            <input
              type="text"
              placeholder="Search by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full sm:w-2/3 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>
      </div>

      {/* EVENTS */}
      <main className="max-w-6xl mx-auto px-4 py-14 grow">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Upcoming events
        </h2>

        {loading ? (
          <p className="text-center text-slate-500">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-slate-500 text-center text-sm">
            No events match your current filters.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;
