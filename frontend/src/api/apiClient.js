import axios from 'axios';

/**
 * FocusFlow API Client
 * Configured to toggle between localhost and production automatically
 * via VITE_API_URL environment variable.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to attach token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('focusflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'A network error occurred';
    
    // You could trigger a toast here if desired
    console.error(`[API Error] ${message}`);
    
    return Promise.reject(error);
  }
);

export default apiClient;
