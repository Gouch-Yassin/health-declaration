import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Importera Routes istället för Switch
import './App.css';
import HealthDeclarationForm from './HealthDeclarationForm';  // Importera hälsodeklarationskomponenten

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Välkommen till Hälsosystemet</h1>

        <div className="button-container">
          <Link to="/health-declaration">
            <button className="large-button">Hälsodeklaration</button>
          </Link>

          <button className="large-button">Kundtjänst</button>
          <button className="large-button">Lägg till symptom</button>
          <button className="large-button">Kontakta oss</button>
        </div>

        <Routes>  {/* Använd Routes istället för Switch */}
          <Route path="/health-declaration" element={<HealthDeclarationForm />} />  {/* Använd element istället för component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
