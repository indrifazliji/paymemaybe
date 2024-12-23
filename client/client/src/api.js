import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Make sure this is your actual backend URL and port
});




// Automatically add JWT token to headers if user is authenticated
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
