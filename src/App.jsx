import './App.css';
import Die from './Die/Die';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import Confetti from "react-confetti";
import sound from './assets/win.mp3';
import gif from './assets/winningGif.gif';

function App() {
  // diceArray holds the state for all the dice
  const [diceArray, setDiceArray] = useState(generateTenDice())
  // gameWon state shows if the game has been won
  const [gameWon, setGameWon] = useState(false)
  // audioRef is a reference to the win sound
  const audioRef = useRef(null);

  // useEffect that checks if the game is won after each dice roll, otherwise AI rolls again
  useEffect(() => {
    const hasWon = diceArray.every(die => die.num === diceArray[0].num);
    setGameWon(hasWon);
    //----------------Change--------------
    if (hasWon) return; // stop AI turns after winning
    setTimeout(AITurn, 100); // AI turn 1 second after roll
    //----------------Change--------------
  }, [diceArray])

  useEffect(() => {
    gameWon ? playAudio() : stopAudio();
  }, [gameWon]);

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

  // Roll all dice that are not picked. If the game has been won, reset it.
  function rollDice() {
    if (!gameWon) {
      setDiceArray(oldArr => oldArr.map(die => die.isPicked ? die : generateNewDie()))
    } else {
      setGameWon(false)
      setDiceArray(generateTenDice());
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

  //----------------Change--------------
  function AITurn() {
    // If the AI has not started picking numbers yet
    if (!diceArray.some(die => die.isPicked)) {
      let counts = Array(7).fill(0); //Create [0, 0, 0, 0, 0, 0, 0]
      for (let die of diceArray) {
        //Then by looking at the diceArray array it will count how many dice of each value there are
        counts[die.num]++; 
      }
      let maxCount = Math.max(...counts);
      let mostCommonNumber = counts.indexOf(maxCount);
      setDiceArray(oldArr => oldArr.map(die => die.num === mostCommonNumber ? { ...die, isPicked: true } : die));
    }
    // If the AI has started picking numbers
    else {
      let pickedNumber = diceArray.find(die => die.isPicked).num;
      setDiceArray(oldArr => oldArr.map(die => die.num === pickedNumber && !die.isPicked ? { ...die, isPicked: true } : die));
    }
    setTimeout(rollDice, 100);  // roll dice 0.1 second after AI turn
  }  
  //----------------Change--------------

  const diceElements = diceArray.map(die => 
    <Die 
      key={die.id} 
      id={die.id} 
      value={die.num} 
      isPicked={die.isPicked} 
    />
  );

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
        <button onClick={rollDice}> {gameWon ? "New Game" : "Roll"}</button>
      </div>
    </>
  )
}

export default App;
