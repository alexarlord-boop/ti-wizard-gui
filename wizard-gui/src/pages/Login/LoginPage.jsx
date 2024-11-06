import React, { useState } from 'react';
import { Button } from "../../components/ui/button.jsx";
import apiClient from "../../api/client.js";
import LoginForm from "./LoginForm.jsx";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            // Send login request with credentials using apiClient
            const loginResponse = await apiClient.post('token/', { username, password });

            if (loginResponse.status === 200) {
                // Store the JWT token in local storage
                const data = loginResponse.data;
                console.log(data);
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                alert('Login successful!');
                // redirect the user to the dashboard page
                window.location.href = '/';
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
        <div className="grid grid-cols-2 items-center justify-center h-[90dvh] ">
            <div className="text-4xl">Trust & Identity Wizard</div>
            <div className=" bg-white p-6 rounded-lg border-2 shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
                <LoginForm/>
            </div>
        </div>
    );
}

export default Login;
