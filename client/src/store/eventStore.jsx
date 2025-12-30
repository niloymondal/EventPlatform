import { create } from "zustand";
import API from "../services/api";

const eventStore = create((set, get) => ({
  // STATES
  events: [],
  selectedEvent: null,
  loading: false,
  savedEvents: [], // store saved event IDs

  // ACTIONS
  fetchEvents: async (onlyUpcoming = false) => {
  set({ loading: true });
  try {
    const res = await API.get("/events");
    let events = res.data || [];

    if (onlyUpcoming) {
      // Filter upcoming events
      const now = new Date();
      events = events.filter(event => new Date(event.date) >= now);
    }

    // Sort by date ascending (soonest first)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    set({ events, loading: false });
  } catch (err) {
    console.error("Fetch events failed", err);
    set({ events: [], loading: false });
  }
},

  fetchMyEvents: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/events/my-events", {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ events: res.data || [], loading: false });
    } catch (err) {
      console.error("Fetch my events failed", err);
      set({ events: [], loading: false });
    }
  },

  fetchEventById: async (id) => {
    set({ loading: true });
    try {
      const res = await API.get(`/events/${id}`);
     set({ selectedEvent: res.data.event || null, loading: false });
    } catch (err) {
      console.error("Fetch event by ID failed", err);
      set({ selectedEvent: null, loading: false });
    }
  },

  createEvent: async (data) => {
    try {
      const token = localStorage.getItem("token");
      await API.post("/events", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().fetchEvents();
    } catch (err) {
      console.error("Create event failed", err);
    }
  },

  updateEvent: async (id, data) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/events/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().fetchEvents();
    } catch (err) {
      console.error("Update event failed", err);
    }
  },

  deleteEvent: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      get().fetchEvents();
    } catch (err) {
      console.error("Delete event failed", err);
    }
  },

  saveEvent: (id) => {
    const { savedEvents } = get();
    if (!savedEvents.includes(id)) {
      set({ savedEvents: [...savedEvents, id] });
    }
  },

  unsaveEvent: (id) => {
    const { savedEvents } = get();
    set({ savedEvents: savedEvents.filter((e) => e !== id) });
  }
}));

export default eventStore;
