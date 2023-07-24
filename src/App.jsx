import { useState } from 'react'
import './App.css'
import Die from './Die/Die'
import {nanoid} from 'nanoid'
import { useEffect } from 'react'

function App() {
  const [diesArr, setDiesArr] = useState(dies())
  const [pickedArr, setPickedArr] = useState([])

  function dies() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({num: Math.floor(Math.random() * 6) + 1, isPicked: false, id: nanoid()});
  }
  return arr;
}

  function pick(id, value){
    setDiesArr(oldVal => oldVal.map(die => die.id === id? {...die, isPicked: !die.isPicked}: die))
    console.log(id, value)
  }

  useEffect(() => console.log(diesArr.filter(die => die.isPicked === true)), [diesArr])

  function roll(){
    setDiesArr(dies())
  }

  const DiesEl = diesArr.map(die => {
    return <Die key={die.id} id={die.id} value={die.num} handleClick={pick}/>
  })

  return (
    <div className='container'>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {DiesEl}
      </div>
      <button onClick={roll}>Roll</button>
    </div>
  )
}

export default App
