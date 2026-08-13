interface Note {
  id: string;
  content: string;
}

import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const noteToAdd = {
      content: newNote,
      id: String(notes.length + 1),
    };
    setNotes((prevNotes) => [...prevNotes, noteToAdd]);
    setNewNote('');
  };

  useEffect(() => {
    axios.get<Note[]>('http://localhost:3001/notes').then((response) => {
      setNotes(response.data);
    });
  }, []);

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
