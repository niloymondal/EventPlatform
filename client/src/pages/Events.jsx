import { useEffect } from "react";
import eventStore from "../store/eventStore";
import EventCard from "../components/EventCard";

export default function Events() {
  const { events, fetchEvents, loading } = eventStore();
  const eventsArray = Array.isArray(events) ? events : [];

  useEffect(() => {
  const loadEvents = async () => {
    await fetchEvents(false); // onlyUpcoming = false
  };
  loadEvents();
}, [fetchEvents]);


  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : eventsArray.length === 0 ? (
        <p className="text-gray-500">No events available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsArray.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
