
import React, { useState } from 'react';
import Employer from './Employer';
import Admin from './Admin';
import TestUpload from './TestUpload';

function App() {
  const [view, setView] = useState('landing');

  const buttonStyle = {
    padding: '12px 18px',
    backgroundColor: '#1d4ed8',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease'
  };

  if (view === 'employer') return <Employer onBack={() => setView('landing')} />;
  if (view === 'admin') return <Admin onBack={() => setView('landing')} />;
  if (view === 'user') return <TestUpload onBack={() => setView('landing')} />;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif', textAlign: 'center' }}>
      <img src="/cv-logo.png" alt="Λογότυπο" style={{ width: 80, marginBottom: 10 }} />
      <h1 style={{ fontSize: '2rem', marginBottom: 10, color: '#1e3a8a' }}>Καλωσορίσατε στην Πλατφόρμα Βιογραφικών</h1>
      <p style={{ marginBottom: 20 }}>Αυτή η εφαρμογή δημιουργήθηκε για τους Σπύρο Αλαφούζο & Χρήστο Μαυρίδη</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={() => setView('user')} style={buttonStyle}>Υποψήφιος</button>
        <button onClick={() => setView('employer')} style={buttonStyle}>Εργοδότης</button>
        <button onClick={() => setView('admin')} style={buttonStyle}>Διαχειριστής</button>
      </div>

      <p style={{ fontSize: '0.8rem', marginTop: 40, color: '#666' }}>
        © {new Date().getFullYear()} Πλατφόρμα Βιογραφικών | Δημιουργήθηκε από την ομάδα ανάπτυξης
      </p>
    </div>
  );
}

export default App;
