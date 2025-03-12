import axios from "axios";



export const instances = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});
