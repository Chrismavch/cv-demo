
import React, { useState, useEffect } from 'react';

function Employer({ onBack }) {
  const [cvs, setCvs] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(data => {
        setCvs(data);
        setFilteredCvs(data);
        const uniqueCategories = [...new Set(data.map(cv => cv.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCvs(cvs.filter(cv => cv.category === selectedCategory));
    } else {
      setFilteredCvs(cvs);
    }
  }, [selectedCategory, cvs]);

  const layoutStyles = {
    container: {
      fontFamily: 'Segoe UI, sans-serif',
      padding: 20,
      maxWidth: 1200,
      margin: 'auto',
    },
    header: {
      color: '#1e3a8a',
      fontSize: '1.8rem',
      marginBottom: 16,
      textAlign: 'center',
    },
    backButton: {
      marginBottom: 20,
      padding: '10px 16px',
      backgroundColor: '#6b7280',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    grid: {
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
    },
    sidebar: {
      minWidth: 200,
    },
    content: {
      flex: 1,
    },
    card: {
      backgroundColor: '#f9fafb',
      padding: 16,
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      marginBottom: 16,
    },
    filterSelect: {
      width: '100%',
      padding: 8,
      marginBottom: 12,
      borderRadius: '6px',
    }
  };

  return (
    <div style={layoutStyles.container}>
      <h1 style={layoutStyles.header}>Λίστα Βιογραφικών Υποψηφίων</h1>

      <div style={layoutStyles.grid}>
        <div style={layoutStyles.sidebar}>
          <label>Φίλτρο ανά κατηγορία:</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={layoutStyles.filterSelect}
          >
            <option value=''>Όλες οι κατηγορίες</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={layoutStyles.content}>
          {filteredCvs.map((cv, index) => (
            <div key={index} style={layoutStyles.card}>
              <h3>{cv.name}</h3>
              <p><strong>Email:</strong> {cv.email}</p>
              <p><strong>Κατηγορία:</strong> {cv.category}</p>
              <p><strong>Δεξιότητες:</strong> {cv.experience}</p>
              <a href={`http://localhost:5050/${cv.filePath}`} target="_blank" rel="noreferrer">
                📄 Δείτε το Βιογραφικό
              </a>
            </div>
          ))}
        </div>
      </div>

      <button style={{ ...layoutStyles.backButton, marginTop: 30 }} onClick={onBack}>
        ⬅ Επιστροφή
      </button>
    </div>
  );
}

export default Employer;
