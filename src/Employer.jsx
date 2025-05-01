import React, { useEffect, useState } from 'react';

export default function Employer({ onBack }) {
  const [cvList, setCvList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(data => setCvList(data))
      .catch(err => console.error('Σφάλμα φόρτωσης:', err));
  }, []);

  const categories = Array.from(
    new Set(cvList.flatMap(cv => cv.categories || []))
  );

  const filtered = categoryFilter
    ? cvList.filter(cv => (cv.categories || []).includes(categoryFilter))
    : cvList;

  return (
    <div style={{
      maxWidth: 800,
      margin: 'auto',
      padding: 20,
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h1 style={{ color: '#1e3a8a', textAlign: 'center' }}>Προβολή Υποψηφίων</h1>

      {/* φίλτρο κατηγορίας */}
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          style={{ padding: 8, fontSize: '1rem', borderRadius: 6, border: '1px solid #ccc' }}
        >
          <option value="">-- Όλες οι Κατηγορίες --</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* αποτελέσματα */}
      {filtered.map((cv, idx) => (
        <div key={idx} style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          backgroundColor: '#f9fafb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <p><strong>Όνομα:</strong> {cv.name}</p>
          <p><strong>Κατηγορίες:</strong> {(cv.categories||[]).join(', ')}</p>
          <a href={`http://localhost:5050/${cv.filePath}`} target="_blank" rel="noreferrer">
            📄 Προβολή CV
          </a>
        </div>
      ))}

      {/* κουμπί επιστροφής κάτω */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={onBack}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ⬅ Επιστροφή
        </button>
      </div>
    </div>
  );
}
