import { useEffect, useState } from 'react';
import './index.css';
import type { DiaryEntry, NewDiaryEntry } from './types';
import diaryService from './services/diaryService';
import Header from './components/Header';
import NewDiaryForm from './components/NewDiaryForm';
import DiaryList from './components/DiaryList';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((initialEntries) => {
      setDiaryEntries(initialEntries);
    });
  }, []);

  const handleSubmit = (newDiaryEntry: NewDiaryEntry) => {
    diaryService.create(newDiaryEntry).then((returnedEntry) => {
      setDiaryEntries((currentEntries) => [...currentEntries, returnedEntry]);
    });
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Header />

        <NewDiaryForm onSubmit={handleSubmit} />

        <DiaryList diaryEntries={diaryEntries} />
      </div>
    </main>
  );
}

export default App;
