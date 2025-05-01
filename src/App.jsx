import React, { useState } from 'react';
import Employer from './Employer';
import Admin from './Admin';

function App() {
  const [view, setView] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSuccess(true), 1000);
  };

  if (view === 'employer') return <Employer onBack={() => setView('user')} />;
  if (view === 'admin') return <Admin onBack={() => setView('user')} />;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Ανέβασμα Βιογραφικού</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={() => setView('user')}>Υποψήφιος</button>
        <button onClick={() => setView('employer')}>Εργοδότης</button>
        <button onClick={() => setView('admin')}>Διαχειριστής</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Ονοματεπώνυμο</label><br />
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        /><br />

        <label>Email</label><br />
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        /><br />

        <label>Εμπειρία / Δεξιότητες</label><br />
        <textarea
          value={experience}
          onChange={e => setExperience(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        /><br />

        <label>Ανέβασμα Βιογραφικού (PDF)</label><br />
        <input
          type='file'
          accept='application/pdf'
          onChange={e => setFile(e.target.files[0])}
          required
          style={{ marginBottom: 10 }}
        /><br />

        <button type='submit'>Υποβολή</button>

        {success && (
          <p style={{ color: 'green', marginTop: 10 }}>
            Το βιογραφικό σας καταχωρήθηκε και αξιολογείται.
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
