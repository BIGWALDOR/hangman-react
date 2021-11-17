import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLetters'
import Word from './components/Word'
import Popup from './components/Popup'
import Notification from './components/Notification'
import { showNotification as show } from './helpers/helpers'
import { randomWords } from './data/words'

let selectedWord = randomWords()



function App() {
  // Define states for the game
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event
      // keyCode 65 - 90 = [A-Z]
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(correctLetters => [...correctLetters, letter])
          } else {
            show(setShowNotification)
            // alert('you already typed this letter')
          }
        
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter])
          } else {
            show(setShowNotification)
            // alert('you already typed this letter')
          }
        }
      }
    }

    // Listen for keydown event within the window
    window.addEventListener('keydown', handleKeydown) 

    return () => window.removeEventListener('keydown', handleKeydown)

  }, [playable, correctLetters, wrongLetters])

  function playAgain () {
    setPlayable(true)

    //Empty Arrays
    setCorrectLetters([])
    setWrongLetters([])

    selectedWord = randomWords()
  }

  return (
    <>
      <Header />
        <div className="game-container">
          <Figure wrongLetters={wrongLetters}/>
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters}/> 
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
          <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
