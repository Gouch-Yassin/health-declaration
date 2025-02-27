import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State för användarens svar och resultat
  const [formData, setFormData] = useState({
    fever: false,
    cough: false,
    tiredness: false,
    shortnessOfBreath: false,
  });

  const [result, setResult] = useState('');
  const [symptomsData, setSymptomsData] = useState([]);  // För att lagra symptomdata

  // Fetching data när komponenten laddas
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch('https://api.example.com/symptoms');
        const data = await response.json();
        setSymptomsData(data);  // Spara data i state
        console.log(data);  // Kolla vad vi får från API:t
      } catch (error) {
        console.error('Error fetching symptoms data:', error);
      }
    };

    fetchSymptoms(); // Anropa fetch när komponenten laddas
  }, []);  // Tom array gör att det bara körs en gång vid uppstart

  // Hantera formulärändringar
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Hantera formulärinlämning
  const handleSubmit = (e) => {
    e.preventDefault();

    const { fever, cough, tiredness, shortnessOfBreath } = formData;
    let diagnosis = 'Ingen sjukdom identifierad.';

    // Logik för att analysera symptomen
    if (fever && cough && shortnessOfBreath) {
      diagnosis = 'Du kan ha influensa eller Covid-19. Vänligen kontakta sjukvården.';
    } else if (fever && tiredness) {
      diagnosis = 'Det kan vara ett tecken på en förkylning eller en annan virusinfektion.';
    } else if (cough) {
      diagnosis = 'Kan vara ett tecken på en förkylning eller hosta.';
    }

    setResult(diagnosis);
  };

  return (
    <div className="app-container">
      <h1>Hälsodeklaration</h1>
      <p>Fyll i följande symptom för att få en rekommendation:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Har du feber?
            <input
              type="checkbox"
              name="fever"
              checked={formData.fever}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Har du hosta?
            <input
              type="checkbox"
              name="cough"
              checked={formData.cough}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Känner du dig trött eller utmattad?
            <input
              type="checkbox"
              name="tiredness"
              checked={formData.tiredness}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Har du svårt att andas eller känner du andfåddhet?
            <input
              type="checkbox"
              name="shortnessOfBreath"
              checked={formData.shortnessOfBreath}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <button type="submit">Analysera mina symptom</button>
        </div>
      </form>

      <div className="result">
        {result && <p>{result}</p>}
      </div>

      {/* Här kan du visa symptomdatat du hämtade */}
      <div className="symptoms-data">
        <h3>Hämtade symptomdata:</h3>
        <pre>{JSON.stringify(symptomsData, null, 2)}</pre> {/* För att visa data snyggt */}
      </div>
    </div>
  );
}

export default App;
