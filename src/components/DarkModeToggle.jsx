import React, { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('mood_dark');
      if (saved) return saved === '1';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem('mood_dark', dark ? '1' : '0'); } catch {}
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="px-3 py-1 border rounded bg-white/30 dark:bg-gray-700/30"
      aria-pressed={dark}
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙 Dark' : '🌤️ Light'}
    </button>
  );
}
