import React, { useState } from 'react';
import Employer from './Employer';
import Admin from './Admin';

function App() {
  const [view, setView] = useState('landing');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('experience', experience);
    formData.append('cv', file);

    try {
      const res = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        alert(data.message || 'Αποτυχία αποστολής.');
      }
    } catch (err) {
      alert('Σφάλμα σύνδεσης με τον διακομιστή.');
    }
  };

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

  const inputStyle = {
    width: '100%',
    marginBottom: 12,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem'
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: 4,
    marginTop: 12
  };

  const containerStyle = {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
    fontFamily: 'Segoe UI, sans-serif'
  };

  if (view === 'employer') return <Employer onBack={() => setView('landing')} />;
  if (view === 'admin') return <Admin onBack={() => setView('landing')} />;

  if (view === 'user') {
    return (
      <div style={containerStyle}>
        <h1 style={{ color: '#1e3a8a' }}>Ανέβασμα Βιογραφικού</h1>
        <button onClick={() => setView('landing')} style={{ marginBottom: 20, ...buttonStyle, backgroundColor: '#6b7280' }}>⬅ Επιστροφή</button>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Ονοματεπώνυμο</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />

          <label style={labelStyle}>Email</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />

          <label style={labelStyle}>Εμπειρία / Δεξιότητες</label>
          <textarea value={experience} onChange={e => setExperience(e.target.value)} required style={inputStyle} />

          <label style={labelStyle}>Ανέβασμα Βιογραφικού (PDF)</label>
          <input type='file' accept='application/pdf' onChange={e => setFile(e.target.files[0])} required style={{ marginBottom: 20 }} />

          <button type='submit' style={buttonStyle}>Υποβολή</button>

          {success && (
            <p style={{ color: 'green', marginTop: 12 }}>
              Το βιογραφικό σας καταχωρήθηκε με επιτυχία.
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div style={{ ...containerStyle, textAlign: 'center' }}>
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
