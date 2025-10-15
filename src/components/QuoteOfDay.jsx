import React, { useEffect, useState } from 'react';

const QUOTES = [
  'Small steps every day add up to big changes.',
  'You are doing better than you think.',
  'Breathe. You are exactly where you need to be.',
  'Progress over perfection.',
  'Your feelings are valid — take it one day at a time.',
  'Every sunrise brings new hope and light.',
  'It’s okay to rest. You’re still growing.',
  'Happiness blooms from within. 🌸',
];

export default function QuoteOfDay() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const today = new Date().toDateString();
    const idx = today.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % QUOTES.length;
    setQuote(QUOTES[idx]);
  }, []);

  return (
    <div
      className="
        mt-6 p-4 rounded-2xl text-center
        bg-white/60 dark:bg-gray-800/50
        shadow-md backdrop-blur-md
        text-gray-700 dark:text-gray-200
        transition-all duration-500 ease-in-out
        animate-fadeIn
      "
    >
      <p className="italic font-medium text-base">“{quote}”</p>
    </div>
  );
}
