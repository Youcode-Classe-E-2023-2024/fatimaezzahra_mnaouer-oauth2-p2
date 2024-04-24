const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
    },
});

// Add an interceptor to include the authentication token in the request headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Retrieve your authentication token from wherever it's stored

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authRole');
            // TODO redirect login page
        }
        return Promise.reject(error);
    }
);
