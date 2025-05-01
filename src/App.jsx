// src/Admin.jsx
import React, { useEffect, useState } from 'react';

function Admin({ onBack }) {
  const [cvList, setCvList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(data => setCvList(data))
      .catch(err => console.error('Σφάλμα φόρτωσης βιογραφικών:', err));
  }, []);

  const filteredList = cvList.filter(item =>
    (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
    (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
    (item.experience && item.experience.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ color: '#1e3a8a' }}>Διαχείριση Βιογραφικών</h1>

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

      <input
        type="text"
        placeholder="Αναζήτηση με όνομα, email ή εμπειρία..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 20,
          borderRadius: 6,
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
      />

      {filteredList.length === 0 ? (
        <p>Δεν βρέθηκαν βιογραφικά.</p>
      ) : (
        filteredList.map((cv, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 14,
              marginBottom: 12,
              backgroundColor: '#f9fafb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <p><strong>Όνομα:</strong> {cv.name}</p>
            <p><strong>Email:</strong> {cv.email}</p>
            <p><strong>Εμπειρία:</strong> {cv.experience}</p>
            {cv.categories && cv.categories.length > 0 && (
              <p><strong>Κατηγορίες:</strong> {cv.categories.join(', ')}</p>
            )}
            <p>
              <strong>Αρχείο:</strong>{' '}
              <a href={`http://localhost:5050/${cv.filePath}`} target="_blank" rel="noreferrer">
                📄 Λήψη / Προβολή
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
