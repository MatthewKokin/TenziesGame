import './PlayerArea.css'
import Die from '../Die/Die';

function PlayerArea({
    diceArray,
    setDiceArray,
    gameWon,
    setGameWon,
    rollCount,
    setRollCount,
    pickDie,
    rollDice,
    userName
}) {
    const diceElements = diceArray.map(die =>
        <Die
            key={die.id}
            id={die.id}
            value={die.num}
            handleClick={pickDie}
            isPicked={die.isPicked}
        />
    );

    return (
        <>
            <div className='playing-area col-5'>
                <div className='statistic d-flex flex-row flex-md-column'>
                    <h2 className='rolls'>{userName}: {rollCount} 🎲</h2>
                </div>
                <div className='dice-container mb-3'>
                    {diceElements}
                </div>
            </div>
        </>
    )
}

export default PlayerArea;
