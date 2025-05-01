import React from 'react';

const mockSubmissions = [
  {
    name: 'Μαρία Κωνσταντίνου',
    email: 'maria.k@example.com',
    experience: '3 χρόνια εμπειρία σε digital marketing και διαχείριση social media.',
    category: 'Μάρκετινγκ'
  },
  {
    name: 'Πέτρος Δημητρίου',
    email: 'petros.d@example.com',
    experience: 'Προγραμματιστής με εξειδίκευση σε Python και Node.js.',
    category: 'Πληροφορική'
  }
];

function Admin({ onBack }) {
  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Διαχείριση Βιογραφικών</h2>
      <button onClick={onBack} style={{ marginBottom: 20 }}>⬅ Επιστροφή</button>

      {mockSubmissions.map((cv, index) => (
        <div key={index} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 15, marginBottom: 15 }}>
          <p><strong>Ονοματεπώνυμο:</strong> {cv.name}</p>
          <p><strong>Email:</strong> {cv.email}</p>
          <p><strong>Εμπειρία:</strong> {cv.experience}</p>
          <p><strong>Αυτόματη Κατηγορία:</strong> {cv.category}</p>
          <button style={{ marginTop: 10 }}>Διόρθωση Κατηγορίας</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
