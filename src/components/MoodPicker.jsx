import React, { useState } from 'react';

export default function MoodPicker({ options, onSave }) {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  function handleSave() {
    if (!selected) return alert('Pick a mood first');
    onSave(selected, note);
    setSelected(null);
    setNote('');
  }

  return (
    <div className="p-4 rounded-lg border border-gray-100 bg-white">
      <div className="flex gap-3">
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => setSelected(o.id)}
            className={`p-3 rounded-lg text-xl shadow-sm transition-transform ${selected === o.id ? 'scale-105 ring-2 ring-pink-300' : ''}`}
            aria-pressed={selected === o.id}
            aria-label={o.label}
          >
            <div>{o.emoji}</div>
            <div className="text-xs mt-1">{o.label}</div>
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Optional note..."
        className="w-full mt-4 p-2 border rounded"
        rows={3}
      />

      <div className="flex justify-end mt-3">
        <button onClick={handleSave} className="btn-primary">Save</button>
      </div>
    </div>
  );
}
