import React, { useState } from 'react';

function FlashcardForm({ onAdd }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    onAdd({ question, answer });
    setQuestion('');
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="Please enter a question."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Please enter the answer to that question."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">Click to add this flashcard!</button>
    </form>
  );
}

export default FlashcardForm;
