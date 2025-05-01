
import React from 'react';

function Employer({ onBack }) {
  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem',
      maxWidth: '800px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <button
        onClick={onBack}
        style={{
          alignSelf: 'flex-start',
          padding: '0.5rem 1rem',
          backgroundColor: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ⬅ Επιστροφή
      </button>

      <h1 style={{ color: '#1e3a8a', fontSize: '1.8rem' }}>Πλατφόρμα για Εργοδότες</h1>
      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
        Ως εργοδότης, μπορείτε να δείτε και να διαχειριστείτε τα ανεβασμένα βιογραφικά υποψηφίων. Αυτή η λειτουργία μπορεί να επεκταθεί
        ώστε να περιλαμβάνει φίλτρα αναζήτησης, προβολή με βάση την εμπειρία ή δεξιότητες, και δυνατότητα επικοινωνίας με υποψηφίους.
      </p>

      <div style={{
        backgroundColor: '#f1f5f9',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        color: '#1e293b',
        fontSize: '0.95rem'
      }}>
        <strong>🔧 Υπό Κατασκευή:</strong> Η λειτουργία αυτή είναι σε φάση ανάπτυξης. Θα προστεθούν σύντομα δυναμικά δεδομένα.
      </div>
    </div>
  );
}

export default Employer;
