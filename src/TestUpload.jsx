// TestUpload.jsx – Updated with submit control, Greek filename support, and back button at bottom
import React, { useState } from 'react';

function TestUpload({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || submitting) {
      setMessage('Παρακαλώ επιλέξτε αρχείο PDF.');
      return;
    }

    setSubmitting(true);
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
      setMessage(data.message || 'Αποτυχία αποστολής.');
      setSubmitted(true);
    } catch (err) {
      setMessage('Σφάλμα σύνδεσης με backend.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const buttonStyle = {
    padding: '10px 14px',
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem'
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2>Ανέβασμα Βιογραφικού</h2>
      <form onSubmit={handleSubmit}>
        <label>Ονοματεπώνυμο:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: 8, margin: '8px 0' }}/>

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, margin: '8px 0' }}/>

        <label>Εμπειρία / Δεξιότητες:</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} required style={{ width: '100%', padding: 8, margin: '8px 0' }}/>

        <label>Ανέβασμα Βιογραφικού PDF:</label>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required style={{ margin: '8px 0' }}/>

        <button type="submit" disabled={submitting || submitted} style={buttonStyle}>
          {submitting ? 'Υποβολή...' : submitted ? 'Υποβλήθηκε' : 'Υποβολή'}
        </button>
      </form>

      {message && <p style={{ marginTop: 10, color: submitted ? 'green' : 'red' }}>{message}</p>}

      <button onClick={onBack} style={buttonStyle}>⬅ Επιστροφή</button>
    </div>
  );
}

export default TestUpload;
