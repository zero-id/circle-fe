import axios from "axios";

export const API = axios.create({
  baseURL: "cicrcle-be-production.up.railway.app/api/v1",
});
