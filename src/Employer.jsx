import React from 'react';

const sampleCandidates = [
  {
    name: 'Νίκος Παπαδόπουλος',
    category: 'Πληροφορική',
    cvLink: '#'
  },
  {
    name: 'Ελένη Γεωργίου',
    category: 'Διοίκηση Επιχειρήσεων',
    cvLink: '#'
  },
  {
    name: 'Γιάννης Αντωνίου',
    category: 'Μάρκετινγκ',
    cvLink: '#'
  }
];

function Employer({ onBack }) {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Προβολή Υποψηφίων</h2>
      <button onClick={onBack} style={{ marginBottom: 20 }}>⬅ Επιστροφή</button>

      {sampleCandidates.map((candidate, index) => (
        <div key={index} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, marginBottom: 10 }}>
          <p><strong>Ονοματεπώνυμο:</strong> {candidate.name}</p>
          <p><strong>Κατηγορία:</strong> {candidate.category}</p>
          <a href={candidate.cvLink} target="_blank" rel="noopener noreferrer">Προβολή Βιογραφικού</a>
        </div>
      ))}
    </div>
  );
}

export default Employer;
