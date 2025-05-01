// src/Employer.jsx
import React, { useEffect, useState } from 'react';

function Employer({ onBack }) {
  const [cvs, setCvs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('Όλες οι κατηγορίες');

  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(data => {
        setCvs(data);
        setFiltered(data);

        // Μετράμε κατηγορίες και κρατάμε μόνο Ελληνικές
        const counts = data.reduce((acc, cv) => {
          const cat = cv.category;
          // regex: μόνο Ελληνικά γράμματα, κενά, / ή -
          if (!/^[Α-Ωα-ωάέίήύόώϊϋΰΐ0-9\s\/-]+$/.test(cat)) return acc;
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {});

        // Φτιάχνουμε πίνακα [{cat, count},...], τον ταξινομούμε
        const catsArr = Object.entries(counts)
          .map(([cat, count]) => ({ cat, count }))
          .sort((a, b) => a.cat.localeCompare(b.cat, 'el'));
        setCategories(catsArr);
      })
      .catch(err => console.error(err));
  }, []);

  // Όταν αλλάζει η επιλογή, φιλτράρουμε
  useEffect(() => {
    if (selectedCat === 'Όλες οι κατηγορίες') {
      setFiltered(cvs);
    } else {
      setFiltered(cvs.filter(cv => cv.category === selectedCat));
    }
  }, [selectedCat, cvs]);

  // Αντί για media queries στο CSS, κάνουμε απλό inline responsive:
  const isMobile = window.innerWidth < 600;

  return (
    <div style={{
      maxWidth: 800,
      margin: 'auto',
      padding: 20,
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      {/* Desktop: dropdown αριστερά, mobile: πάνω */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        marginBottom: 20,
        gap: 10
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '10px 14px',
            backgroundColor: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            order: isMobile ? 2 : 0
          }}
        >
          ⬅ Επιστροφή
        </button>

        <select
          value={selectedCat}
          onChange={e => setSelectedCat(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 6,
            border: '1px solid #ccc',
            fontSize: '1rem',
            flex: isMobile ? 'none' : '1',
            order: 1
          }}
        >
          <option>Όλες οι κατηγορίες ({cvs.length})</option>
          {categories.map(({cat, count}) => (
            <option key={cat}>
              {cat} ({count})
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>Δεν βρέθηκαν βιογραφικά για την κατηγορία.</p>
      ) : (
        filtered.map((cv, idx) => (
          <div
            key={idx}
            style={{
              background: '#f9fafb',
              padding: 20,
              borderRadius: 8,
              marginBottom: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <p><strong>Όνομα:</strong> {cv.name}</p>
            <p><strong>Email:</strong> {cv.email}</p>
            <p><strong>Κατηγορία:</strong> {cv.category}</p>
            <p><strong>Δεξιότητες:</strong> {cv.experience}</p>
            <a
              href={`http://localhost:5050/${cv.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1d4ed8' }}
            >
              📄 Δείτε το Βιογραφικό
            </a>
          </div>
        ))
      )}

      {/* Mobile: back button στο κάτω μέρος */}
      {isMobile && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            onClick={onBack}
            style={{
              padding: '10px 14px',
              backgroundColor: '#6b7280',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >⬅ Επιστροφή</button>
        </div>
      )}
    </div>
  );
}

export default Employer;
