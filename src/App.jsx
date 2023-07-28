import './App.css'
import Die from './Die/Die'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'
import Confetti from "react-confetti"
import sound from './assets/win.mp3';
import gif from './assets/winningGif.gif';

function App() {
  // diceArray holds the state for all the dice
  const [diceArray, setDiceArray] = useState(generateTenDice())
  // gameWon state shows if the game has been won
  const [gameWon, setGameWon] = useState(null)
  // audioRef is a reference to the win sound
  const [rollCount, setRollCount] = useState(0)
  const audioRef = useRef(null)
  
  // useEffect that checks if the game is won after each dice roll
  useEffect(() => {
    const selectedDice = diceArray.filter(die => die.isPicked)
    if (selectedDice.length === 10) {
      const hasWon = diceArray.every(die => die.num === diceArray[0].num);
      setGameWon(hasWon);
    }
  }, [diceArray])

  // Generates an array of 10 new dice
  function generateTenDice() {
    return Array.from({ length: 10 }, generateNewDie);
  }

  // Generates a new die with a random number and unique ID
  function generateNewDie() {
    return {
      num: Math.ceil(Math.random() * 6),
      isPicked: false,
      id: nanoid()
    }
  }

  // Updates the isPicked property of a die
  function pickDie(id) {
    setDiceArray(oldArr => oldArr.map(die => die.id === id ? { ...die, isPicked: !die.isPicked } : die));
  }

  // Roll all dice that are not picked. If the game has been won, reset it.
  function rollDice() {
    if(gameWon===null){
      setGameWon(false)
      setDiceArray(generateTenDice());
    }
    else if(!gameWon) {
      setDiceArray(oldArr => oldArr.map(die => die.isPicked ? die : generateNewDie()))
      setRollCount(old => old+1)
    } else if(gameWon) {
      setRollCount(0)
      setGameWon(null)
    }
  }

  // Play the win sound
  function playAudio() {
    audioRef.current = new Audio(sound);
    audioRef.current.loop = true;
    audioRef.current.play();
  }

  // Stop the win sound
  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  // Ends the win animation and starts a new game
  function finishWinningAnimation(event) {
    if (gameWon && event.target) {
      rollDice()
    }
  }

  // Map the diceArray state to Die components
  const diceElements = diceArray.map(die => 
    <Die 
      key={die.id} 
      id={die.id} 
      value={die.num} 
      handleClick={pickDie} 
      isPicked={die.isPicked} 
    />
  );

  // Play or stop audio depending on gameWon state
  useEffect(() => {
    gameWon ? playAudio() : stopAudio();
  }, [gameWon]);

  return (
    <>
      {gameWon && <Confetti />}
      {gameWon && <img src={gif} className='winning-img' alt="Winning celebration" />}
      <div className='container' onClick={finishWinningAnimation}>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button onClick={rollDice}> {
        gameWon === null ? "🥳 New game" : (gameWon === false ? "🎲 Roll" : "🥲 Finish")}</button>
        <h2>{rollCount}</h2>
      </div>
    </>
  )
}

export default App;
