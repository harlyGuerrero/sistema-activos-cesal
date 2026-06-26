import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://sistema-activos-cesal.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});