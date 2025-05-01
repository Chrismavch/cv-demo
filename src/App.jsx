// src/App.jsx
import React, { useState } from 'react';
import Employer from './Employer';
import Admin from './Admin';

export default function App() {
  const [view, setView] = useState('landing');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('experience', experience);
    form.append('cv', file);
    try {
      const res = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: form
      });
      if (res.ok) setSuccess(true);
      else alert((await res.json()).message);
    } catch {
      alert('Σφάλμα σύνδεσης με server');
    }
  };

  const btn = {
    padding: '12px 18px',
    backgroundColor: '#1d4ed8',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  };
  const container = { maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' };

  // ===== Views =====
  if (view === 'employer') return <Employer onBack={() => setView('landing')} />;
  if (view === 'admin')    return <Admin    onBack={() => setView('landing')} />;

  if (view === 'user') {
    return (
      <div style={container}>
        <h1 style={{ color: '#1e3a8a' }}>Ανέβασμα Βιογραφικού</h1>
        <button
          onClick={() => setView('landing')}
          style={{ marginBottom: 20, ...btn, backgroundColor: '#6b7280' }}
        >
          ⬅ Επιστροφή
        </button>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold', marginTop: 12 }}>Ονοματεπώνυμο</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc' }}
          />

          <label style={{ fontWeight: 'bold' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc' }}
          />

          <label style={{ fontWeight: 'bold' }}>Εμπειρία / Δεξιότητες</label>
          <textarea
            value={experience}
            onChange={e => setExperience(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc' }}
          />

          <label style={{ fontWeight: 'bold' }}>Αρχείο PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setFile(e.target.files[0])}
            required
            style={{ marginBottom: 20 }}
          />

          <button type="submit" style={btn}>Υποβολή</button>
          {success && <p style={{ color: 'green', marginTop: 12 }}>Το βιογραφικό σας καταχωρήθηκε με επιτυχία.</p>}
        </form>
      </div>
    );
  }

  // ===== Landing =====
  return (
    <div style={{ ...container, textAlign: 'center' }}>
      <img src="/cv-logo.png" alt="Λογότυπο" style={{ width: 80, marginBottom: 10 }} />
      <h1 style={{ color: '#1e3a8a' }}>Καλωσορίσατε στην Πλατφόρμα Βιογραφικών</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
        <button style={btn} onClick={() => setView('user')}>Υποψήφιος</button>
        <button style={btn} onClick={() => setView('employer')}>Εργοδότης</button>
        <button style={btn} onClick={() => setView('admin')}>Διαχειριστής</button>
      </div>
    </div>
  );
}
