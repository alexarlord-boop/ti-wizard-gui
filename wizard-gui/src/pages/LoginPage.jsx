import React, { useState } from 'react';
import { Button } from "../components/ui/button.jsx";
import apiClient from "../api/client.js";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            // Send login request with credentials using apiClient
            const loginResponse = await apiClient.post('/api/token/', { username, password });

            if (loginResponse.status === 200) {
                // Store the JWT token in local storage
                const data = loginResponse.data;
                console.log(data);
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                alert('Login successful!');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid credentials.');
            } else {
                setErrorMessage('An error occurred.');
                console.log(error);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}

export default Login;
