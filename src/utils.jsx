import { nanoid } from 'nanoid'
export {generateTenDice, generateNewDie, addsEl}

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

const addsEl = (
    <div className="col-sm-2 sidenav p-0 bg-info-subtle">
      <div className="well"><p>ADS</p></div>
      <div className="well"><p>ADS</p></div>
      <div className="well"><p>ADS</p></div>
      <div className="well"><p>ADS</p></div>
    </div>
  )