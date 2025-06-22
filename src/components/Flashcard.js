import React, { useState } from 'react';

function Flashcard({ flashcard, onDelete, onEdit }) {
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(flashcard.question);
  const [editedAnswer, setEditedAnswer] = useState(flashcard.answer);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    setFlipped(!flipped);
  };

  const handleSave = () => {
    onEdit({ question: editedQuestion, answer: editedAnswer });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion(flashcard.question);
    setEditedAnswer(flashcard.answer);
    setIsEditing(false);
  };

  return (
    <div className="flashcard" onClick={handleCardClick}>
      <button className="delete-button" onClick={onDelete}>×</button>
      <button className="edit-button" onClick={() => setIsEditing(true)}>🗒️</button>

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
            placeholder="Edit question"
          />
          <input
            type="text"
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            placeholder="Edit answer"
          />
          <div style={{ marginTop: '8px' }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel} style={{ marginLeft: '8px' }}>Cancel</button>
          </div>
        </div>
      ) : (
        <p>{flipped ? flashcard.answer : flashcard.question}</p>
      )}
    </div>
  );
}

export default Flashcard;
