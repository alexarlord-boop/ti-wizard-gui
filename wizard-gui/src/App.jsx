import {useState} from 'react'
import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RolesPage from "./pages/RolesPage.jsx";
import RemotePage from "./pages/RemotePage.jsx";
import RoleEditPage from "./pages/RoleEditPage.jsx";
import FederationSelectionPage from "./pages/FederationSelectionPage.jsx";


function App() {
    const [count, setCount] = useState(0)

    return (
        <Router>
            {/* MainLayout wraps the entire application layout */}
            <MainLayout>
                <Routes>
                    {/* Define routes for different components */}
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/roles" element={<RolesPage/>}/>
                    <Route path="/roles/edit/:entityType" element={<RoleEditPage/>}/>
                    <Route path="/remote-entities" element={<RemotePage/>}/>
                    {/*<Route path="/remote-entities/add/:entityType" element={}/>*/}
                    <Route path="/sources/federations" element={<FederationSelectionPage/>}/>


                    {/* Catch-all route for unknown paths */}
                    <Route path="*" element={<Navigate to="/" replace/>}/>


                </Routes>
            </MainLayout>
        </Router>
    )
}

// export default App
export default function WrappedApp() {
    return (
        <Suspense fallback="...loading">
            <App />
        </Suspense>
    )
}