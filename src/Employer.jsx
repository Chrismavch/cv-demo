import React, { useEffect, useState } from 'react';

function Employer({ onBack }) {
  const [cvs, setCvs] = useState([]);
  const [category, setCategory] = useState('Όλες οι κατηγορίες');

  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(data => setCvs(data))
      .catch(err => console.error('Σφάλμα φόρτωσης βιογραφικών:', err));
  }, []);

  const categories = Array.from(new Set(cvs.map(c => c.category))).sort();
  categories.unshift('Όλες οι κατηγορίες');

  const filtered = cvs.filter(c =>
    category === 'Όλες οι κατηγορίες' || c.category === category
  );

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      <button
        onClick={onBack}
        style={{
          display: 'inline-block',
          marginBottom: 20,
          backgroundColor: '#6b7280',
          color: '#fff',
          padding: '10px 14px',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        ⬅ Επιστροφή
      </button>

      <h1 style={{ color: '#1e3a8a', marginTop: 0, marginBottom: 20 }}>Λίστα Βιογραφικών Υποψηφίων</h1>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 200px' }}>
          <label>Φίλτρο ανά κατηγορία:</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: '1 1 auto' }}>
          {filtered.map((cv, index) => (
            <div
              key={index}
              style={{ background: '#f9fafb', padding: 20, borderRadius: 8, marginBottom: 16 }}
            >
              <p><strong>{cv.name}</strong></p>
              <p><strong>Email:</strong> {cv.email}</p>
              <p><strong>Κατηγορία:</strong> {cv.category}</p>
              <p><strong>Δεξιότητες:</strong> {cv.experience}</p>
              <a
                href={`http://localhost:5050/${cv.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Δείτε το Βιογραφικό
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Employer;
