// src/App.jsx
import React, { useState } from 'react';
import Employer from './Employer';
import Admin from './Admin';
import Candidate from './Candidate';

export default function App() {
  // which “screen” are we showing?
  const [view, setView] = useState('landing');

  // shared button style
  const btn = {
    padding: '12px 18px',
    backgroundColor: '#1e3a8a',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  };

  // shared container style
  const container = {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
    fontFamily: 'Segoe UI, sans-serif',
  };

  // ——— Candidate (User) view ———
  if (view === 'user') {
    return <Candidate onBack={() => setView('landing')} />;
  }

  // ——— Employer view ———
  if (view === 'employer') {
    return <Employer onBack={() => setView('landing')} />;
  }

  // ——— Admin view ———
  if (view === 'admin') {
    return <Admin onBack={() => setView('landing')} />;
  }

  // ——— Landing page ———
  return (
    <div style={{ ...container, textAlign: 'center' }}>
      <img
        src="/cv-logo.png"
        alt="Λογότυπο Πλατφόρμας Βιογραφικών"
        style={{ width: 80, marginBottom: 10 }}
      />
      <h1 style={{ color: '#1e3a8a' }}>Καλωσορίσατε στην Πλατφόρμα Βιογραφικών</h1>
      <p>Επιλέξτε τον ρόλο σας για να συνεχίσετε:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
        <button style={btn} onClick={() => setView('user')}>
          Υποψήφιος
        </button>
        <button style={btn} onClick={() => setView('employer')}>
          Εργοδότης
        </button>
        <button style={btn} onClick={() => setView('admin')}>
          Διαχειριστής
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#666', marginTop: 40 }}>
        © {new Date().getFullYear()} Πλατφόρμα Βιογραφικών | Αναπτύχθηκε από την ομάδα
      </p>
    </div>
  );
}
