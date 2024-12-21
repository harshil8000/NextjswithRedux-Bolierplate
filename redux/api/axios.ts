import axios from "axios";

// Base URL setup (can be set in environment variables)
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

axios.defaults.baseURL = baseURL;

// Add request interceptor to include token from localStorage
axios.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('accessToken'); // Replace 'token' with the actual key you're using

    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (optional, for handling errors like 401 Unauthorized)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors, e.g., token expiration (401)
    if (error.response && error.response.status === 401) {
      console.error('Token expired or invalid');
      // You can handle the token expiration case here, like redirecting the user to login
      // Optionally clear the token from localStorage
      localStorage.removeItem('token');
      // Redirect to login page (for example using Next.js Router)
      // Router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axios;
