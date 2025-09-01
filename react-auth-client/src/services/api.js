import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Use an interceptor to add the auth token to every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const registerUser = (data) => api.post('register', data);
export const loginUser = (data) => api.post('login', data);
export const fetchUsers = () => api.get('users');
export const fetchTeachers = () => api.get('teachers');