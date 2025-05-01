// src/Candidate.jsx
import React, { useState } from 'react';

const ALL_CATEGORIES = [
  'Πληροφορική',
  'Διοίκηση Επιχειρήσεων',
  'Δημιουργία Περιεχομένου',
  'Εστίαση',
  'Διανομή',
  'Μάρκετινγκ'
];

export default function Candidate({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = cat => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else if (categories.length < 3) {
      setCategories([...categories, cat]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return setMessage('Παρακαλώ επιλέξτε αρχείο PDF.');
    if (categories.length === 0) return setMessage('Παρακαλώ επιλέξτε τουλάχιστον μία κατηγορία.');

    setSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('experience', experience);
    formData.append('cv', file);
    formData.append('categories', JSON.stringify(categories));

    try {
      const res = await fetch('http://localhost:5050/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      setMessage(data.message || 'Αποτυχία αποστολής.');
      if (res.ok) setSubmitted(true);
    } catch {
      setMessage('Σφάλμα σύνδεσης με backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            marginBottom: 20,
            padding: '8px 12px',
            backgroundColor: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: 6
          }}
        >
          ⬅ Επιστροφή
        </button>
      )}
      <h2>Ανέβασμα Βιογραφικού</h2>

      <form onSubmit={handleSubmit}>
        <label>Ονοματεπώνυμο:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <label>Εμπειρία / Δεξιότητες:</label>
        <textarea
          value={experience}
          onChange={e => setExperience(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <label style={{ margin: '12px 0 8px' }}>Κατηγορίες (1–3):</label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',    // 3 columns
            gridTemplateRows: 'repeat(2, auto)',      // 2 rows
            gap: '8px 16px',                          // rowGap / columnGap
            alignItems: 'start',               // ← top-align every cell
            marginBottom: 12
          }}
        >
          {ALL_CATEGORIES.map((cat, i) => (
            <label
              key={cat}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.95rem',
                // column alignment: left, center, right
                justifySelf: ['start', 'left', 'left'][i % 3],
                whiteSpace: 'nowrap',  // ← optional: prevent the two-word labels from wrapping
              }}
            >
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                disabled={!categories.includes(cat) && categories.length >= 3}
              />
              {cat}
            </label>
          ))}
        </div>

        <label>Ανέβασμα Βιογραφικού PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
          required
          style={{ marginBottom: 20, width: '100%' }}
        />

        <button
          type="submit"
          disabled={submitting || submitted}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: submitted ? '#16a34a' : '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: submitting || submitted ? 'default' : 'pointer'
          }}
        >
          {submitting ? 'Υποβολή...' : submitted ? '✅ Υποβλήθηκε' : 'Υποβολή'}
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
