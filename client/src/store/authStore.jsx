import { create } from "zustand";
import API from "../services/api";

const authStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: async (data) => {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    set({ user: res.data });
  },

  register: async (data) => {
    const res = await API.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    set({ user: res.data });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null });
  }
}));

export default authStore;
