import { useState } from 'react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RolesPage from "./pages/RolesPage/RolesPage.jsx";
import RemotePage from "./pages/RemotePage/RemotePage.jsx";
import RoleEditPage from "./pages/RoleEditPage.jsx";
import FederationSelectionPage from "./pages/FederationSelectionPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import PrivateRoute from "./components/custom/PrivteRoute.jsx";
import LogsPage from "./pages/LogsPage.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Router>
            <Routes>
                {/* Define routes for different components */}
                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                <Route path="/login" element={<LoginPage />} />

                {/* Secure routes with PrivateRoute */}
                <Route path="/roles" element={<PrivateRoute><MainLayout><RolesPage /></MainLayout></PrivateRoute>} />
                <Route path="/roles/edit/:entityType" element={<PrivateRoute><MainLayout><RoleEditPage /></MainLayout></PrivateRoute>} />
                <Route path="/remote-entities" element={<PrivateRoute><MainLayout><RemotePage /></MainLayout></PrivateRoute>} />
                <Route path="/sources/federations" element={<PrivateRoute><MainLayout><FederationSelectionPage /></MainLayout></PrivateRoute>} />
                <Route path="/logs" element={<PrivateRoute><MainLayout><LogsPage/></MainLayout></PrivateRoute>} />
                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

// export default App
export default function WrappedApp() {
    return (
        <Suspense fallback="...loading">
            <App />
        </Suspense>
    );
}