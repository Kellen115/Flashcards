// This brings in React so we can use JSX and other React stuff
import React, { useState, useEffect } from 'react';

// These are my own components that I made for the flashcards and the form
import Flashcard from './components/Flashcard';
import FlashcardForm from './components/FlashcardForm';

function App() {

//State variable for dark mode
  const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('darkMode');
  return saved === 'true';
  });

//State variable for delete button
  const deleteFlashcard = (indexToDelete) => {
    setFlashcards(prev => prev.filter((_, index) => index !== indexToDelete));
  };

//State variable for edit button
  const editFlashcard = (index, updatedCard) => {
    setFlashcards(prev =>
      prev.map((card, i) => (i === index ? updatedCard : card))
    );
  };

//Checks if there is any saved dark mode in localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
  }, []);

//Saves their preference next time they load the app.
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

// This is where I store all the flashcards in the app (starts empty)
  const [flashcards, setFlashcards] = useState([]);

// I'm checking if there are any saved flashcards in localStorage
  useEffect(() => {
    const storedCards = localStorage.getItem('flashcards');
    if (storedCards) {
      setFlashcards(JSON.parse(storedCards));
    }
  }, []);

// It saves the current flashcards to localStorage
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

// This function adds a new flashcard to the list
  const addFlashcard = (card) => {
    setFlashcards(prev => [card, ...prev]);
  };

// This is what gets shown on the page
  return (
    <div style={{ position: 'relative', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button 
        onClick={() => setDarkMode(prev => !prev)}
        className="dark-mode-toggle"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <h1>Flashcard App</h1>
      <FlashcardForm onAdd={addFlashcard} />
      <div style={{ marginTop: '20px' }}>
        {flashcards.map((card, idx) => (
          <Flashcard 
            key={idx}
            flashcard={card}
            onDelete={() => deleteFlashcard(idx)}
            onEdit={(updatedCard) => editFlashcard(idx, updatedCard)}
            />
        ))}
      </div>
    </div>
  );
}

// This lets other files use the app component.   
export default App;