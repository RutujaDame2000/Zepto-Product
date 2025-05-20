// src/config/config.js

const API = window.location.hostname === "localhost"
  ? "http://localhost:5003/api"
  : process.env.REACT_APP_API_URL || "/api";

const BASE_URL = API.replace('/api', '');

export { API, BASE_URL }; // ✅ named exports
