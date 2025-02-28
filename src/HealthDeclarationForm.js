import React, { useState, useEffect } from 'react';
import './App.css';

function HealthDeclarationForm() {
  // State och logik för formuläret här
  const [formData, setFormData] = useState({
    fever: false,
    cough: false,
    tiredness: false,
    shortnessOfBreath: false,
    headache: false,
    musclePain: false,
    soreThroat: false,
    lossOfSmell: false,
    name: '',
    age: '',
    gender: '',
    previousIllness: '',
  });

  const [result, setResult] = useState('');
  const [symptomsData, setSymptomsData] = useState([]);  // För att lagra symptomdata

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch('https://api.example.com/symptoms');
        const data = await response.json();
        setSymptomsData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching symptoms data:', error);
      }
    };

    fetchSymptoms();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fever, cough, tiredness, shortnessOfBreath, headache, musclePain, soreThroat, lossOfSmell, age, gender, previousIllness } = formData;
    let diagnosis = 'Ingen sjukdom identifierad.';

    if (fever && cough && shortnessOfBreath && lossOfSmell) {
      diagnosis = 'Du kan ha Covid-19. Vänligen kontakta sjukvården för vidare bedömning.';
    } else if (fever && cough && soreThroat) {
      diagnosis = 'Det kan vara ett tecken på influensa eller en annan virusinfektion.';
    } else if (tiredness && musclePain && headache) {
      diagnosis = 'Det kan vara ett tecken på en allmän förkylning eller en annan infektion.';
    } else if (fever && headache) {
      diagnosis = 'Det kan vara ett tecken på migrän eller en virusinfektion.';
    }

    if (age && gender) {
      if (age < 18) {
        diagnosis += ' Du är ung, fortsätt vara vaksam och vila.';
      } else if (age > 65) {
        diagnosis += ' Som äldre rekommenderar vi att du söker vård snabbare.';
      }

      if (gender === 'female') {
        diagnosis += ' Som kvinna kan hormonella förändringar också påverka symptomen.';
      }
    }

    if (previousIllness) {
      diagnosis += ` Eftersom du har haft ${previousIllness}, vänligen kontakta din läkare för vidare rådgivning.`;
    }

    setResult(diagnosis);
  };

  return (
    <div className="app-container">
      <h1>Hälsodeklaration</h1>
      <p>Fyll i följande symptom och information för att få en rekommendation:</p>

      <form onSubmit={handleSubmit}>
        <div className="personal-info">
          <label>
            Namn:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Ålder:
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </label>
          <label>
            Kön:
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Man</option>
              <option value="female">Kvinna</option>
              <option value="other">Annat</option>
            </select>
          </label>
          <label>
            Har du haft någon allvarlig sjukdom tidigare? (t.ex. hjärtproblem, diabetes)
            <input type="text" name="previousIllness" value={formData.previousIllness} onChange={handleChange} />
          </label>
        </div>

        <div className="symptoms">
          <label>
            Har du feber?
            <input
              type="checkbox"
              name="fever"
              checked={formData.fever}
              onChange={handleChange}
            />
          </label>

          <label>
            Har du hosta?
            <input
              type="checkbox"
              name="cough"
              checked={formData.cough}
              onChange={handleChange}
            />
          </label>

          <label>
            Känner du dig trött eller utmattad?
            <input
              type="checkbox"
              name="tiredness"
              checked={formData.tiredness}
              onChange={handleChange}
            />
          </label>

          <label>
            Har du svårt att andas eller känner du andfåddhet?
            <input
              type="checkbox"
              name="shortnessOfBreath"
              checked={formData.shortnessOfBreath}
              onChange={handleChange}
            />
          </label>

          <label>
            Har du huvudvärk?
            <input
              type="checkbox"
              name="headache"
              checked={formData.headache}
              onChange={handleChange}
            />
          </label>

          <label>
            Känner du muskelsmärta?
            <input
              type="checkbox"
              name="musclePain"
              checked={formData.musclePain}
              onChange={handleChange}
            />
          </label>

          <label>
            Har du ont i halsen?
            <input
              type="checkbox"
              name="soreThroat"
              checked={formData.soreThroat}
              onChange={handleChange}
            />
          </label>

          <label>
            Har du förlorat lukt- eller smaksinnet?
            <input
              type="checkbox"
              name="lossOfSmell"
              checked={formData.lossOfSmell}
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
    </div>
  );
}

export default HealthDeclarationForm;
