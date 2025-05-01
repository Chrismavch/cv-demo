// src/TestUpload.jsx
import React, { useState } from 'react';

const ALL_CATEGORIES = [
  'Πληροφορική',
  'Διοίκηση Επιχειρήσεων',
  'Μάρκετινγκ',
  'Εστίαση',
  'Διανομή',
  'Δημιουργία Περιεχομένου',
  'Social Media'
];

function TestUpload({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (cat) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else if (categories.length < 3) {
      setCategories([...categories, cat]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Παρακαλώ επιλέξτε αρχείο PDF.');
    if (categories.length === 0) return setMessage('Παρακαλώ επιλέξτε 1 έως 3 κατηγορίες.');

    setSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('experience', experience);
    formData.append('cv', file);
    formData.append('categories', JSON.stringify(categories));

    try {
      const res = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || 'Αποτυχία αποστολής.');
      if (res.ok) setSubmitted(true);
    } catch (err) {
      setMessage('Σφάλμα σύνδεσης με backend.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      {onBack &&
        <button onClick={onBack} style={{ marginBottom: 20, padding: '8px 12px', backgroundColor: '#6b7280', color: '#fff', border: 'none', borderRadius: 6 }}>
          ⬅ Επιστροφή
        </button>
      }
      <h2>Ανέβασμα Βιογραφικού (Δοκιμαστική Φόρμα)</h2>

      <form onSubmit={handleSubmit}>
        <label>Ονοματεπώνυμο:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Εμπειρία / Δεξιότητες:</label>
        <textarea value={experience} onChange={e => setExperience(e.target.value)} required />

        <label>Κατηγορίες (1 έως 3):</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                value={cat}
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                disabled={!categories.includes(cat) && categories.length >= 3}
                style={{ marginRight: 4 }}
              />
              {cat}
            </label>
          ))}
        </div>

        <label>Ανέβασμα Βιογραφικού PDF:</label>
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required />

        <button
          type="submit"
          disabled={submitting || submitted}
          style={{
            marginTop: 12,
            padding: '10px 16px',
            backgroundColor: submitted ? '#16a34a' : '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: submitted ? 'default' : 'pointer'
          }}
        >
          {submitting ? 'Υποβολή...' : submitted ? '✅ Υποβλήθηκε' : 'Υποβολή'}
        </button>
      </form>

      {message && <p style={{ marginTop: 12, color: submitted ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default TestUpload;
