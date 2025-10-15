import React, { useEffect, useState } from 'react';
import MoodPicker from './components/MoodPicker';
import EntryList from './components/EntryList';
import HistoryChart from './components/HistoryChart';
import DarkModeToggle from './components/DarkModeToggle';
import QuoteOfDay from './components/QuoteOfDay';
import { loadEntries, saveEntries } from './utils/storage';

const moodOptions = [
  { id: 5, label: '✨ Ecstatic', emoji: '🤩' },
  { id: 4, label: '😊 Happy', emoji: '😊' },
  { id: 3, label: '😐 Neutral', emoji: '😐' },
  { id: 2, label: '😕 Sad', emoji: '😕' },
  { id: 1, label: '😫 Stressed', emoji: '😫' },
];

export default function App() {
  const [entries, setEntries] = useState(loadEntries());

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  function addEntry(moodId, note) {
    const entry = {
      id: Date.now(),
      mood: moodId,
      note: note || '',
      createdAt: new Date().toISOString(),
    };
    setEntries(prev => [entry, ...prev]);
  }

  function deleteEntry(id) {
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  return (
    <div className="min-h-screen p-4">
      <div className="app-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="header">Mood Journal</div>
            <div className="small">Log your mood daily. Visualize trends over time.</div>
          </div>
          <DarkModeToggle />
        </div>

        <QuoteOfDay />

        <div className="mt-6">
          <MoodPicker options={moodOptions} onSave={addEntry} />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Recent Entries</h3>
            <EntryList entries={entries} onDelete={deleteEntry} options={moodOptions} />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Mood History</h3>
            <HistoryChart entries={entries} options={moodOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
