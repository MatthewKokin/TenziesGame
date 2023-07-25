import './App.css'
import Die from './Die/Die'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {
  const [diesArr, setDiesArr] = useState(getTenDies())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const pickedDies = diesArr.filter(die => die.isPicked)
    if (pickedDies.length === 10) {
      for (let i = 0; i < 10; i++) {
        if (diesArr[0].num === diesArr[i].num) {
          setTenzies(true)
        } else {
          break
        }
      }
    }
  }, [diesArr])

  /*
  Scrimba
  const allPicked = diesArr.every(die => die.Picked) //either true or false
    const firstValue = diesArr[0].value
    const allSameValue = diesArr.every(die => die.value === firstValue)
    if (allPicked && allSameValue) {
      setTenzies(true)
      console.log("You won!")
  */

  function getTenDies() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  }

  function generateNewDie() {
    return {
      num: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function pick(id) {
    setDiesArr(oldVal => {
      const updatedDies = oldVal.map(die => die.id === id ? { ...die, isPicked: !die.isPicked } : die)
      return updatedDies;
    })
  }

  function roll() {
    setDiesArr(oldVal => {
      return oldVal.map(die => die.isPicked ? die : generateNewDie())
    })
  }

  const DiesEl = diesArr.map(die => {
    return <Die key={die.id} id={die.id} value={die.num} handleClick={pick} isPicked={die.isPicked} />
  })

  return (
    <>
      {tenzies ? <p>You Won!!!</p> :
        <div className='container'>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='dice-container'>
            {DiesEl}
          </div>
          <button onClick={roll}>Roll</button>
        </div>
      }
    </>
  )
}

export default App
