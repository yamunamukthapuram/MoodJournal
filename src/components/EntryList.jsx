import React from 'react';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function EntryList({ entries, onDelete, options }) {
  const moodMap = Object.fromEntries(options.map(o => [o.id, o]));

  if (!entries || entries.length === 0) return <div className="text-sm text-gray-500">No entries yet.</div>;

  return (
    <div className="space-y-3 max-h-96 overflow-auto">
      {entries.map(e => (
        <div key={e.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-start">
          <div>
            <div className="text-2xl">{moodMap[e.mood]?.emoji}</div>
            <div className="text-sm text-gray-600">{moodMap[e.mood]?.label} • {formatDate(e.createdAt)}</div>
            {e.note && <div className="mt-2">{e.note}</div>}
          </div>
          <div>
            <button onClick={() => onDelete(e.id)} className="text-xs text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
