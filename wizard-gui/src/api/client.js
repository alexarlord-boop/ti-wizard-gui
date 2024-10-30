import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

// Add a request interceptor to attach the JWT token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                try {
                    const response = await axios.post('/api/token/refresh/', {
                        refresh: refreshToken,
                    });

                    // Update the access token in localStorage
                    localStorage.setItem('access_token', response.data.access);

                    // Set the new access token in the authorization header and retry the request
                    originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Handle the case where refreshing the token fails
                    console.error('Token refresh failed:', refreshError);
                    // Optionally log out the user or redirect them to the login page
                }
            }
        }

        return Promise.reject(error);
    }
);


export default apiClient;
