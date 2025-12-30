import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  FileText,
  Users,
  Share2,
  UserPlus,
  Heart,
  Check,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import eventStore from "../store/eventStore";
import API from "../services/api"; // make sure API baseURL points to backend

export default function EventDetails() {
  const { id } = useParams();
  const {
    selectedEvent,
    fetchEventById,
    loading,
    savedEvents,
    saveEvent,
    unsaveEvent,
  } = eventStore();

  const [interested, setInterested] = useState(false);
  const [going, setGoing] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [emails, setEmails] = useState([]); // live emails from DB

  const isSaved = selectedEvent && savedEvents.includes(selectedEvent._id);

  const handleSave = () => {
    if (!selectedEvent) return;
    isSaved ? unsaveEvent(selectedEvent._id) : saveEvent(selectedEvent._id);
  };

  // Fetch emails from backend
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await API.get("/users/emails");
        setEmails(res.data.emails || []);
      } catch (err) {
        console.error("Failed to fetch emails", err);
        setEmails([]);
      }
    };
    fetchEmails();
  }, []);

  const handleInvite = (email) => {
    toast.success(`Invited ${email}`);
    setInviteOpen(false);
  };

  const handleShare = (email) => {
    toast.success(`Shared with ${email}`);
    setShareOpen(false);
  };

  useEffect(() => {
    if (id) fetchEventById(id);
  }, [id, fetchEventById]);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (!selectedEvent)
    return <p className="p-6 text-gray-500">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Toaster position="top-right" />
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        {/* Banner */}
        <div className="w-full h-40 bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          Event
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">
            {selectedEvent.title}
          </h2>
          <div className="flex items-center gap-3 flex-wrap text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={16} />{" "}
              {selectedEvent.date
                ? new Date(selectedEvent.date).toDateString()
                : "Date not available"}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} /> {selectedEvent.time || "Time not available"}
            </div>
            {selectedEvent.category && (
              <span className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                <Tag size={14} /> {selectedEvent.category}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-gray-700">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            <span>{selectedEvent.location || "Location not available"}</span>
          </div>
          <div className="flex items-start gap-2">
            <FileText size={16} className="text-gray-500 mt-1" />
            <span>{selectedEvent.description || "No description"}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3 justify-center">
          {/* Interested */}
          <button
            onClick={() => setInterested(!interested)}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition ${
              interested
                ? "bg-pink-100 text-pink-700 border-pink-400"
                : "bg-pink-50 text-pink-700 border-pink-300 hover:bg-pink-100"
            }`}
          >
            {interested && <Check size={16} />} <Heart size={16} /> Interested
          </button>

          {/* Going */}
          <button
            onClick={() => setGoing(!going)}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition ${
              going
                ? "bg-emerald-100 text-emerald-700 border-emerald-400"
                : "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
            }`}
          >
            {going && <Check size={16} />} <Users size={16} /> Going
          </button>

          {/* Invite */}
          <div className="relative inline-block">
            <button
              onClick={() => setInviteOpen((s) => !s)}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"
            >
              <UserPlus size={16} /> Invite
            </button>
            {inviteOpen && (
              <div className="absolute bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">
                  Invite recipients
                </div>
                {emails.length === 0 && (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No emails available
                  </div>
                )}
                {emails.map((email) => (
                  <div
                    key={email}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                    onClick={() => handleInvite(email)}
                  >
                    {email}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share */}
          <div className="relative inline-block">
            <button
              onClick={() => setShareOpen((s) => !s)}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100"
            >
              <Share2 size={16} /> Share
            </button>
            {shareOpen && (
              <div className="absolute bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">
                  Share with
                </div>
                {emails.length === 0 && (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No emails available
                  </div>
                )}
                {emails.map((email) => (
                  <div
                    key={email}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                    onClick={() => handleShare(email)}
                  >
                    {email}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition ${
              isSaved
                ? "bg-gray-200 text-gray-700 border-gray-300"
                : "bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
            }`}
          >
            {isSaved && <Check size={16} />}{" "}
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
