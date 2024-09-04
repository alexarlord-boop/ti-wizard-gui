import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RolesPage from "./pages/RolesPage.jsx";
import RemotePage from "./pages/RemotePage.jsx";




function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
          {/* MainLayout wraps the entire application layout */}
          <MainLayout>
              <Routes>
                  {/* Define routes for different components */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/roles" element={<RolesPage />} />
                  <Route path="/remote-entities" element={<RemotePage />} />


                  {/* Catch-all route for unknown paths */}
                  <Route path="*" element={<Navigate to="/" replace />} />


              </Routes>
          </MainLayout>
      </Router>
  )
}

export default App
