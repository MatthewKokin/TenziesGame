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

  function hold(id){
    const PickedEl = diesArr.find(die => die.id === id)
    if (PickedEl.isPicked){
      setPickedArr(oldVal => [...oldVal, PickedEl])
    }else if(!PickedEl.isPicked){
      setPickedArr(oldVal => oldVal.filter(die => die.id !== id))
    }
  }

  function pick(id, value){
    setDiesArr(oldVal => oldVal.map(die => die.id === id? {...die, isPicked: !die.isPicked}: die))
    hold(id)
  }

  //---------------
  useEffect(() => console.log(diesArr.filter(die => die.isPicked === true)), [diesArr])
  useEffect(() => {
    console.log("Picked array: ", pickedArr);
  }, [pickedArr]);
  
  //---------------

  function roll(){
    setDiesArr(dies())
  }

  const DiesEl = diesArr.map(die => {
    return <Die key={die.id} id={die.id} value={die.num} handleClick={pick} isPicked={die.isPicked}/>
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
