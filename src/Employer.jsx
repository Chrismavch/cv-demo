// src/Employer.jsx
import React, { useEffect, useState } from 'react';

export default function Employer({ onBack }) {
  const [cvs, setCvs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('Όλες οι κατηγορίες');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Διαχείριση αλλαγής μεγέθους
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Φόρτωση CVs
  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(data => {
        setCvs(data);

        // Μέτρημα κατηγοριών (μόνο ελληνικές)
        const counts = data.reduce((acc, cv) => {
          const cat = cv.category || 'Άγνωστη';
          if (/^[Α-Ωα-ωάέίήύόώϊϋΰΐ0-9\s\/-]+$/.test(cat)) {
            acc[cat] = (acc[cat] || 0) + 1;
          }
          return acc;
        }, {});

        // Μετατροπή σε πίνακα και ταξινόμηση
        const catsArr = Object.entries(counts)
          .map(([cat, count]) => ({ cat, count }))
          .sort((a, b) => a.cat.localeCompare(b.cat, 'el'));
        setCategories(catsArr);
      })
      .catch(console.error);
  }, []);

  // Φιλτράρισμα
  const displayed = selectedCat === 'Όλες οι κατηγορίες'
    ? cvs
    : cvs.filter(cv => cv.category === selectedCat);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
      }}>
        {/* Desktop: πίσω αριστερά, Mobile: στο τέλος */}
        <button
          onClick={onBack}
          style={{
            padding: '10px 14px',
            backgroundColor: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            order: isMobile ? 2 : 0,
            width: isMobile ? '100%' : 'auto'
          }}
        >
          ⬅ Επιστροφή
        </button>

        <select
          value={selectedCat}
          onChange={e => setSelectedCat(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 6,
            border: '1px solid #ccc',
            fontSize: '1rem',
            order: 1
          }}
        >
          <option>
            Όλες οι κατηγορίες ({cvs.length})
          </option>
          {categories.map(({ cat, count }) => (
            <option key={cat} value={cat}>
              {cat} ({count})
            </option>
          ))}
        </select>
      </div>

      {/* Εμφάνιση CVs */}
      {displayed.length === 0
        ? <p>Δεν βρέθηκαν βιογραφικά για την κατηγορία αυτή.</p>
        : displayed.map((cv, i) => (
          <div key={i} style={{
            background: '#f9fafb',
            padding: 20,
            borderRadius: 8,
            marginBottom: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
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
      }

      {/* Mobile: πίσω κάτω */}
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
              cursor: 'pointer',
              width: '100%'
            }}
          >
            ⬅ Επιστροφή
          </button>
        </div>
      )}
    </div>
  );
}
