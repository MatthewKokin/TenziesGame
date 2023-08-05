import './Computer.css'
import { useEffect, useState } from 'react'
import { generateTenDice, generateNewDie } from '../../utils'
import Die from '../Die/Die';
import Timer from '../Timer/Timer';

function Computer() {
  // diceArray holds the state for all the dice
  const [diceArray, setDiceArray] = useState(generateTenDice())
  // gameWon state shows if the game has been won
  const [gameWon, setGameWon] = useState(false)

  const [rollCount, setRollCount] = useState(0)
  const [isRunning, setIsRunning] = useState(null)

  // useEffect that checks if the game is won after each dice roll, otherwise AI rolls again
  useEffect(() => {
    const hasWon = diceArray.every(die => die.num === diceArray[0].num);
    setGameWon(hasWon);
    setIsRunning(null)
    //----------------Change--------------
    if (hasWon) return; // stop AI turns after winning
    setTimeout(AITurn, 100); // AI turn 1 second after roll
    //----------------Change--------------
  }, [diceArray])


  // Roll all dice that are not picked. If the game has been won, reset it.
  function rollDice() {
    if (!gameWon) {
      setDiceArray(oldArr => oldArr.map(die => die.isPicked ? die : generateNewDie()))
      setIsRunning(true)
    } else {
      setGameWon(false)
      setDiceArray(generateTenDice());
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
    <div className='lay'>
        <div className='container'>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='play-area'>
            <div className='dice-container'>
              {diceElements}
            </div>
            <div className='stats'>
              <Timer handleClick={rollDice} isRunning={isRunning} />
              <h2 className='rolls'>Rolls: {rollCount} 🎲</h2>
            </div>
          </div>
          <button onClick={rollDice}> {
            gameWon === null ? "🥳 New game" : (gameWon === false ? "🎲 Roll" : "🥲 Finish")}</button>
        </div>
      </div>
  )
}

export default Computer;
