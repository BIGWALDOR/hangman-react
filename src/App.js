import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLetters'
import Word from './components/Word'
import Popup from './components/Popup'
import Notification from './components/Notification'

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];



function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(correctLetters => [...correctLetters, letter])
          } else {
            alert('you already typed this letter')
          }
        
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter])
          } else {
            alert('you already typed this letter')
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeydown) 

    return () => window.removeEventListener('keydown', handleKeydown)

  })
  return (
    <>
      <Header />
        <div className="game-container">
          <Figure />
          <WrongLetters />
          <Word selectedWord={selectedWord} correctLetters={correctLetters}/> 
        </div>
    </>
  );
}

export default App;
