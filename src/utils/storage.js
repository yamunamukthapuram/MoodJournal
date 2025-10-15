const KEY = 'mood_journal_entries_v1';

export function loadEntries() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      // seed demo data once
      const seed = [
        { id: Date.now() + 1, mood: 4, note: 'Feeling playful at the park 🌼', createdAt: new Date().toISOString() },
        { id: Date.now() - 1000 * 60 * 60 * 24, mood: 3, note: 'Quiet afternoon with tea.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
      ];
      saveEntries(seed);
      return seed;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load entries', e);
    return [];
  }
}

export function saveEntries(entries) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save entries', e);
  }
}
