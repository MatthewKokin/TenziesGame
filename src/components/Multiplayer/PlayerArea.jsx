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
    rollDice
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
            <div className='play-area col-5'>
                <div className='stats d-flex flex-row flex-md-column'>
                    <h2 className='rolls'>Rolls: {rollCount} 🎲</h2>
                </div>
                <div className='dice-container mb-3'>
                    {diceElements}
                </div>
                <button onClick={rollDice}> {gameWon === null ? "🥳 New game" : (gameWon === false ? "🎲 Roll" : "🥲 Finish")}</button>
            </div>
        </>
    )
}

export default PlayerArea;
