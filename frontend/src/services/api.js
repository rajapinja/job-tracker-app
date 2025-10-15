import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:9395';
console.log('API BASE URL:', BASE); // optional debug

const api = axios.create({
  baseURL: BASE,
  timeout: 10000
});

export default api;
