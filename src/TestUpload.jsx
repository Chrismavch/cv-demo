import React, { useState } from 'react';

export default function TestUpload({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file || submitting) return setMessage('Παρακαλώ επιλέξτε PDF.');
    setSubmitting(true);
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
      const data = await res.json();
      setMessage(data.message);
      setSubmitted(true);
    } catch {
      setMessage('Σφάλμα σύνδεσης.');
    } finally {
      setSubmitting(false);
    }
  };

  const btn = { padding: '10px 16px', backgroundColor: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 6, cursor: submitted ? 'default' : 'pointer' };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ color: '#1e3a8a' }}>Δοκιμαστική Φόρμα Upload</h2>
      <form onSubmit={handleSubmit}>
        <label>Ονοματεπώνυμο</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} required style={{ width:'100%', padding:8, margin:'6px 0', borderRadius:4, border:'1px solid #ccc' }} />

        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ width:'100%', padding:8, margin:'6px 0', borderRadius:4, border:'1px solid #ccc' }} />

        <label>Εμπειρία / Δεξιότητες</label>
        <textarea value={experience} onChange={e=>setExperience(e.target.value)} required style={{ width:'100%', padding:8, margin:'6px 0', borderRadius:4, border:'1px solid #ccc' }} />

        <label>Αρχείο PDF</label>
        <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files[0])} required style={{ margin:'6px 0' }} />

        <button type="submit" disabled={submitting||submitted} style={btn}>
          {submitting ? 'Υποβολή...' : submitted ? 'Υποβλήθηκε' : 'Υποβολή'}
        </button>
      </form>

      {message && <p style={{ marginTop:12, color: submitted ? 'green' : 'red' }}>{message}</p>}

      <div style={{ textAlign:'center', marginTop:20 }}>
        <button onClick={onBack} style={{ padding:'8px 14px', backgroundColor:'#6b7280', color:'#fff', border:'none', borderRadius:6 }}>
          ⬅ Επιστροφή
        </button>
      </div>
    </div>
  );
}
