import { useState, useEffect } from "react";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

   // Toast notifications
  const notifyCreate = () => toast('Event Created Successfully!');
  const notifyUpdate = () => toast('Event Updated Successfully!');
  const notifyDelete = () => toast('Event Deleted Successfully!');


  const loadMyEvents = async () => {
    try {
      const res = await API.get("/events/my-events");
      const payload = res.data;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.events)
        ? payload.events
        : [];
      setEvents(list);
      return list;
    } catch (err) {
      console.error(err);
      setEvents([]);
      return [];
    }
  };

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const res = await API.get("/events/my-events");
        const payload = res.data;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.events)
          ? payload.events
          : [];
        if (mounted) setEvents(list);
      } catch (err) {
        console.error(err);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   try {
      if (editingId) {
        await API.put(`/events/${editingId}`, form);
        setEditingId(null);
        notifyUpdate();
      } else {
        await API.post("/events", form);
        notifyCreate();
      }
    } catch (err) {
      console.error(err);
    }

    setForm({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "",
      description: "",
    });

    loadMyEvents();
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setForm(event);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Warning! Are you sure you wanna delete this?');
    if (!isConfirmed) return;

    try {
      await API.delete(`/events/${id}`);
      notifyDelete();
      loadMyEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      {/* CREATE / UPDATE FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3 mb-8">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border p-2" />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" required className="border p-2" />
        <input name="time" value={form.time} onChange={handleChange} placeholder="Time" required className="border p-2" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="border p-2" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="border p-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="border p-2" />

        <button className="bg-blue-600 text-white py-2" type="submit">
          {editingId ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* MY EVENTS */}
      <h3 className="text-xl font-semibold mb-2">My Events</h3>

      {events.length === 0 && <p className="text-gray-500">No events yet.</p>}

      {events.map((e) => (
        <div key={e._id} className="border p-4 mb-3">
          <h4 className="font-bold">{e.title}</h4>
          <p>{e.location} | {e.category}</p>

          <div className="flex gap-4 mt-2">
            <button onClick={() => handleEdit(e)} className="bg-blue-500 text-white hover:bg-blue-300 px-3 py-1 rounded-md text-xs md:text-sm">Edit</button>
            <button onClick={() => handleDelete(e._id)} className="bg-red-500 text-white hover:bg-red-300 px-3 py-1 rounded-md text-xs md:text-sm">Delete</button>
          </div>
        </div>
      ))}
       <ToastContainer />
    </div>
  );
}
