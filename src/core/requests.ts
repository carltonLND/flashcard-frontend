import axios from "axios";

// Create Axios instance with our backend URL
export const server = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
