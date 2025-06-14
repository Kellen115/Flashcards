import React, { useState } from 'react';

function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className ="flashcard"
    >
      {flipped ? <p>{flashcard.answer}</p> : <p>{flashcard.question}</p>}
    </div>
  );
}

export default Flashcard;
