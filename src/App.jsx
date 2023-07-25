import './App.css'
import Die from './Die/Die'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'
import Confetti from "react-confetti"
import sound from './assets/win.mp3';
import gif from './assets/winningGif.gif';

function App() {
  const [diesArr, setDiesArr] = useState(getTenDies())
  const [tenzies, setTenzies] = useState(false)
  const audioRef = useRef(null);

  useEffect(() => {
    const pickedDies = diesArr.filter(die => die.isPicked)
    if (pickedDies.length === 10) {
      const isTenzies = diesArr.every(die => die.num === diesArr[0].num);
      setTenzies(isTenzies);
    }
  }, [diesArr])

  function getTenDies() {
    return Array.from({ length: 10 }, generateNewDie);
  }

  function generateNewDie() {
    return {
      num: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function pick(id) {
    setDiesArr(oldArr => oldArr.map(die => die.id === id ? { ...die, isPicked: !die.isPicked } : die));
  }

  function roll() {
    setDiesArr(oldArr => oldArr.map(die => die.isPicked ? die : generateNewDie()));
  }

  function playAudio() {
    audioRef.current = new Audio(sound);
    audioRef.current.loop = true;
    audioRef.current.play();
  }

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function finishWinningAnimation(event) {
    if (tenzies && event.target) {
      setTenzies(false)
      stopAudio()
    }
  }

  const DiesEl = diesArr.map(die => <Die key={die.id} id={die.id} value={die.num} handleClick={pick} isPicked={die.isPicked} />);

  useEffect(() => {
    tenzies ? playAudio() : stopAudio();
  }, [tenzies]);

  return (
    <>
      {tenzies && <Confetti />}
      {tenzies && <img src={gif} className='winning-img' alt="Winning celebration" />}
      <div className='container' onClick={finishWinningAnimation}>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {DiesEl}
        </div>
        <button onClick={roll}> {tenzies ? "New Game" : "Roll"}</button>
      </div>
    </>
  )
}

export default App;
