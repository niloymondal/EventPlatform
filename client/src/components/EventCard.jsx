import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import eventStore from "../store/eventStore";

const EventCard = ({ event }) => {
  const { savedEvents, saveEvent, unsaveEvent } = eventStore();
  const isSaved = savedEvents.includes(event._id);

  const handleSave = () => {
    isSaved ? unsaveEvent(event._id) : saveEvent(event._id);
  };

  // Safe date formatting
  const formattedDate = event.date
    ? new Date(event.date).toDateString()
    : "Date not set";

  // Safe location fallback
  const location = event.location || "Location not set";

  // Safe description fallback
  const description = event.description || "No description available";

  return (
    <div className="group bg-slate-50 border border-slate-200 rounded-lg overflow-hidden transition hover:border-slate-300 hover:bg-white">
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-[15px] font-semibold text-slate-900 leading-snug mb-3 group-hover:text-slate-800">
          {event.title || "Untitled Event"}
        </h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar size={14} className="text-slate-500" />
            <span className="font-medium tracking-wide">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <MapPin size={14} className="text-slate-500" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5">
          {description}
        </p>

        <div className="border-t border-slate-200 mb-4"></div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <Link
            to={`/events/${event._id}`}
            className="text-sm font-medium text-blue-500 hover:text-blue-800 underline-offset-4 hover:underline"
          >
            View details
          </Link>

          <button
            onClick={handleSave}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md border transition ${
              isSaved
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
