// TestUpload.jsx
import React, { useState } from 'react';

function TestUpload({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
    setCategories(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || submitting) return setMessage('Παρακαλώ επιλέξτε αρχείο PDF.');
    if (categories.length === 0) return setMessage('Παρακαλώ επιλέξτε τουλάχιστον μία κατηγορία.');

    setSubmitting(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('experience', experience);
    categories.forEach(cat => formData.append('categories', cat));
    formData.append('cv', file);

    try {
      const res = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      });
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
      <h2 style={{ color: '#1e3a8a' }}>Ανέβασμα Βιογραφικού</h2>
      <form onSubmit={handleSubmit}>
        <label>Ονοματεπώνυμο:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Εμπειρία / Δεξιότητες:</label>
        <textarea value={experience} onChange={e => setExperience(e.target.value)} required />

        <label>Κατηγορίες (κρατήστε Ctrl για πολλαπλή επιλογή):</label>
        <select multiple value={categories} onChange={handleCategoryChange} required style={{ width: '100%', padding: 8, marginBottom: 12 }}>
          <option value="Πληροφορική">Πληροφορική</option>
          <option value="Διοίκηση Επιχειρήσεων">Διοίκηση Επιχειρήσεων</option>
          <option value="Μάρκετινγκ">Μάρκετινγκ</option>
          <option value="Εστίαση">Εστίαση</option>
          <option value="Barista">Barista</option>
          <option value="Content Creation">Content Creation</option>
          <option value="Social Media">Social Media</option>
        </select>

        <label>Ανέβασμα PDF:</label>
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required />

        <button
          type="submit"
          disabled={submitting || submitted}
          style={{
            marginTop: 20,
            padding: '12px 18px',
            backgroundColor: submitted ? '#16a34a' : '#1d4ed8',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: submitted ? 'default' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {submitted ? '✅ Υποβλήθηκε' : submitting ? 'Αποστολή...' : 'Αποστολή'}
        </button>
      </form>

      {message && <p style={{ marginTop: 10, color: submitted ? 'green' : 'red' }}>{message}</p>}

      <button
        onClick={onBack}
        style={{
          marginTop: 30,
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
    </div>
  );
}

export default TestUpload;
