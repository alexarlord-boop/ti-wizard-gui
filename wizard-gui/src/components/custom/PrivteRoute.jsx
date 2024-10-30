import React from "react";
import { Navigate } from "react-router-dom";

// Function to simulate authentication check
const isAuthenticated = () => {
    // Implement actual authentication logic here (e.g., check token in local storage, session, etc.)
    return !!localStorage.getItem('access_token'); // Assume auth token is stored in localStorage
};

export default function PrivateRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
}
