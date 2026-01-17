import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (username, email, password, confirmPassword) =>
    apiClient.post('/auth/register', {
      username,
      email,
      password,
      confirmPassword,
    }),

  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  getCurrentUser: () => apiClient.get('/auth/me'),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default apiClient;
