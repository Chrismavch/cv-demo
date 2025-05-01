import React, { useState } from 'react';
import Employer from './Employer';
import Admin from './Admin';
import TestUpload from './TestUpload';

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

  const buttonStyle = {
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

  if (view === 'employer') return <Employer onBack={()=>setView('landing')} />;
  if (view === 'admin')    return <Admin    onBack={()=>setView('landing')} />;
  if (view === 'test')     return <TestUpload onBack={()=>setView('landing')} />;

  // === landing ===
  return (
    <div style={{ ...container, textAlign: 'center' }}>
      <img src="/cv-logo.png" alt="Λογότυπο" style={{ width: 80, marginBottom: 10 }} />
      <h1 style={{ color: '#1e3a8a' }}>Καλωσορίσατε στην Πλατφόρμα Βιογραφικών</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
        <button style={buttonStyle} onClick={()=>setView('test')}>Δοκιμή Upload</button>
        <button style={buttonStyle} onClick={()=>setView('employer')}>Εργοδότης</button>
        <button style={buttonStyle} onClick={()=>setView('admin')}>Διαχειριστής</button>
        <button style={buttonStyle} onClick={()=>setView('user')}>Υποψήφιος (App)</button>
      </div>
    </div>
  );
}
