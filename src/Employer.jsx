// src/Employer.jsx
import React, { useEffect, useState } from 'react';

export default function Employer({ onBack }) {
  const [cvs, setCvs] = useState([]);
  // Categories will now be a list of unique category strings from the data
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('Όλες οι κατηγορίες');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Handle window resize for responsive layout
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Load CVs and build list of available categories
  useEffect(() => {
    fetch('http://localhost:5050/api/cvs')
      .then(res => res.json())
      .then(data => {
        setCvs(data);

        // **FIX:** Collect all unique categories from the 'categories' array in CVs
        const allCategories = new Set();
        data.forEach(cv => {
            // Ensure cv.categories is an array before iterating
            if (Array.isArray(cv.categories)) {
                cv.categories.forEach(cat => {
                    // Basic check for valid looking Greek/ASCII category strings
                    if (typeof cat === 'string' && /^[Α-Ωα-ωάέίήύόώϊϋΰΐA-Za-z0-9\s\/-]+$/.test(cat)) {
                         allCategories.add(cat);
                    }
                });
            }
        });

        // Convert to sorted array
        const sortedCategories = Array.from(allCategories).sort((a, b) => a.localeCompare(b, 'el'));
        setAvailableCategories(sortedCategories); // Update state with unique categories
      })
      .catch(console.error);
  }, []);

  // Filter CVs by selected category
  // **FIX:** Filter based on if the cv.categories array includes the selected category
  const displayed = selectedCat === 'Όλες οι κατηγορίες'
    ? cvs
    : cvs.filter(cv => Array.isArray(cv.categories) && cv.categories.includes(selectedCat));


    // **FIX:** Calculate counts for the displayed list for the dropdown label
    const currentCategoryCount = selectedCat === 'Όλες οι κατηγορίες' ? cvs.length : displayed.length;


  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Toolbar with back button and category selector */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
      }}>
        {/* Back button: left on desktop, bottom on mobile */}
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

        {/* Category dropdown */}
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
          {/* **FIX:** Update dropdown label to reflect the count of the selected category */}
          <option value="Όλες οι κατηγορίες">Όλες οι κατηγορίες ({cvs.length})</option>
           {/* **FIX:** Map through the collected unique categories */}
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {/* **FIX:** Calculate and display count for each specific category option */}
              {cat} ({cvs.filter(cv => Array.isArray(cv.categories) && cv.categories.includes(cat)).length})
            </option>
          ))}
        </select>
      </div>

      {/* List of CVs */}
      {displayed.length === 0
        ? <p>Δεν βρέθηκαν βιογραφικά {selectedCat !== 'Όλες οι κατηγορίες' ? `για την κατηγορία "${selectedCat}"` : ''}.</p>
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
             {/* **FIX:** Display categories as a comma-separated string */}
            {cv.categories?.length > 0 && (
                 <p><strong>Κατηγορίες:</strong> {cv.categories.join(', ')}</p>
            )}
            <p><strong>Εμπειρία:</strong> {cv.experience}</p> {/* Reordered experience/categories for consistency */}

            {/* Link construction remains the same, as backend now provides correct filePath */}
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

      {/* Mobile-only back button at the bottom */}
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