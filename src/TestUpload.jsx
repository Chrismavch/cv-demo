// TestUpload.jsx – Updated with submit control and Greek filename support
import React, { useState } from 'react';

function TestUpload() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || submitting) return setMessage('Παρακαλώ επιλέξτε αρχείο PDF.');

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

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Test Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Ονοματεπώνυμο:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Εμπειρία:</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} required />

        <label>Ανέβασμα PDF:</label>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />

        <button type="submit" disabled={submitting || submitted}>
          {submitting ? 'Αποστολή...' : submitted ? 'Υποβλήθηκε' : 'Αποστολή'}
        </button>
      </form>

      {message && <p style={{ marginTop: 10, color: 'green' }}>{message}</p>}
    </div>
  );
}

export default TestUpload;
