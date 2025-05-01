// src/Employer.jsx
import React, { useEffect, useState } from 'react';

export default function Employer({ onBack }) {
  const [cvs, setCvs] = useState([]);
  const [category, setCategory] = useState('Όλες');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(list => {
        setCvs(list);
        const cats = Array.from(new Set(list.map(cv => cv.category))).sort();
        setCategories(['Όλες', ...cats]);
      })
      .catch(err => console.error(err));
  }, []);

  const filtered = cvs.filter(cv =>
    category === 'Όλες' || cv.category === category
  );

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      {/* ← Επιστροφή στην κορυφή */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-block',
          marginBottom: 20,
          padding: '10px 14px',
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

      <h1 style={{ color: '#1e3a8a', marginBottom: 16 }}>Προβολή Υποψηφίων</h1>

      {/* Φίλτρο κατηγορίας */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: 'bold', marginRight: 8 }}>Κατηγορία:</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Λίστα υποψηφίων */}
      {filtered.length === 0 ? (
        <p>Δεν βρέθηκαν υποψήφιοι για την κατηγορία «{category}».</p>
      ) : (
        filtered.map((cv, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              backgroundColor: '#f9fafb'
            }}
          >
            <p><strong>Όνομα:</strong> {cv.name}</p>
            <p><strong>Email:</strong> {cv.email}</p>
            <p><strong>Εμπειρία:</strong> {cv.experience}</p>
            <p>
              <strong>Βιογραφικό:</strong>{' '}
              <a
                href={`http://localhost:5050/${cv.filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                📄 Άνοιγμα PDF
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
