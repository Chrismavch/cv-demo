// src/TestUpload.jsx
import React, { useState, useEffect } from 'react';

const ALL_CATEGORIES = [
  'Πληροφορική',
  'Διανομή',
  'Εστίαση',
  'Ψηφιακό Μάρκετινγκ',
  'Καφέ/Barista',
  'Δημιουργία Περιεχομένου'
];

export default function TestUpload({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validate selection count
  const toggleCategory = cat => {
    setCategories(prev => {
      if (prev.includes(cat)) {
        return prev.filter(c => c !== cat);
      } else if (prev.length < 3) {
        return [...prev, cat];
      }
      return prev;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!file) {
      return setMessage('Παρακαλώ επιλέξτε αρχείο PDF.');
    }
    if (categories.length === 0) {
      return setMessage('Παρακαλώ επιλέξτε τουλάχιστον μία κατηγορία.');
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('experience', experience);
    formData.append('cv', file);
    formData.append('categories', JSON.stringify(categories));

    try {
      const res = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setMessage(res.ok ? '✅ Το βιογραφικό σας καταχωρήθηκε!' : data.message);
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
      setMessage('Σφάλμα σύνδεσης με τον διακομιστή.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2>Test Upload Form</h2>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          marginBottom: 20,
          padding: '10px 14px',
          backgroundColor: '#6b7280',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        ⬅ Επιστροφή
      </button>

      <form onSubmit={handleSubmit}>
        {/* Categories checkboxes */}
        <fieldset style={{ marginBottom: 20, border: '1px solid #ccc', borderRadius: 6, padding: 10 }}>
          <legend style={{ fontWeight: 'bold' }}>Κατηγορίες (1–3 επιλογές)</legend>
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} style={{ display: 'block', marginBottom: 6 }}>
              <input
                type="checkbox"
                value={cat}
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                disabled={!categories.includes(cat) && categories.length >= 3}
                style={{ marginRight: 8 }}
              />
              {cat}
            </label>
          ))}
        </fieldset>

        <label>Ονοματεπώνυμο:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />

        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />

        <label>Εμπειρία / Δεξιότητες:</label>
        <textarea value={experience} onChange={e => setExperience(e.target.value)} required style={{ width: '100%', marginBottom: 10, padding: 8 }} />

        <label>Ανέβασμα PDF:</label>
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required style={{ marginBottom: 20 }} />

        <button
          type="submit"
          disabled={submitting || submitted}
          style={{
            width: '100%',
            padding: '12px 0',
            backgroundColor: submitted ? '#16a34a' : '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            cursor: submitted ? 'default' : 'pointer'
          }}
        >
          {submitted ? 'Υποβλήθηκε' : submitting ? 'Υποβολή...' : 'Υποβολή'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 12, color: submitted ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}
