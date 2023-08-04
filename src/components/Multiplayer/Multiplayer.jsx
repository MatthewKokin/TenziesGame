import { useEffect, useState } from "react";
import PlayerArea from "./PlayerArea";
import { generateTenDice, generateNewDie, addsEl } from '../../utils'

export default function Multiplayer() {
    const [diceArrayPlayer1, setDiceArrayPlayer1] = useState(generateTenDice());
    const [diceArrayPlayer2, setDiceArrayPlayer2] = useState(generateTenDice());
    const [gameWonPlayer1, setGameWonPlayer1] = useState(null);
    const [gameWonPlayer2, setGameWonPlayer2] = useState(null);
    const [rollCountPlayer1, setRollCountPlayer1] = useState(0);
    const [rollCountPlayer2, setRollCountPlayer2] = useState(0);

    // Function to handle dice pick for a specific player
    function pickDie(diceArraySetter, id) {
        diceArraySetter(oldArr => oldArr.map(die => die.id === id ? { ...die, isPicked: !die.isPicked } : die));
    }

    // Function to handle dice roll for a specific player
    function rollDice(diceArray, diceArraySetter, rollCountSetter, gameWonSetter) {
        // New game state
        if (gameWonSetter === null) {
            gameWonSetter(false);
            diceArraySetter(generateTenDice());
        }
        // Roll state
        else if (!gameWonSetter) {
            diceArraySetter(oldArr => oldArr.map(die => die.isPicked ? die : generateNewDie()));
            rollCountSetter(old => old + 1);
        }
        // Finish state
        else if (gameWonSetter) {
            rollCountSetter(0);
            gameWonSetter(null);
        }
    }

    // Function to check if the game is won for a specific player
    function checkWin(diceArray, gameWonSetter) {
        const selectedDice = diceArray.filter(die => die.isPicked);
        if (selectedDice.length === 10) {
            const hasWon = diceArray.every(die => die.num === diceArray[0].num);
            gameWonSetter(hasWon);
        }
    }

    useEffect(() => {
        checkWin(diceArrayPlayer1, setGameWonPlayer1);
        checkWin(diceArrayPlayer2, setGameWonPlayer2);
    }, [diceArrayPlayer1, diceArrayPlayer2]);

    // You can follow the same pattern as above to create functions for audio, etc.

    // ...

    // Render both players
    return (
        <>
            <div className="container-fluid text-center p-0 main">
                <div className="row content">
                    {addsEl}
                    <div className=" field col-sm-8 text-left p-0">
                        <h1 className='row'>Tenzies</h1>
                        <p className='row'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

                        <div className='players-area row d-flex justify-content-around'>
                            {/* Player 1 */}
                            <PlayerArea
                                diceArray={diceArrayPlayer1}
                                setDiceArray={setDiceArrayPlayer1}
                                gameWon={gameWonPlayer1}
                                setGameWon={setGameWonPlayer1}
                                rollCount={rollCountPlayer1}
                                setRollCount={setRollCountPlayer1}
                                pickDie={pickDie}
                                rollDice={rollDice}
                            />
                            {/* Player 2 */}
                            <PlayerArea
                                diceArray={diceArrayPlayer2}
                                setDiceArray={setDiceArrayPlayer2}
                                gameWon={gameWonPlayer2}
                                setGameWon={setGameWonPlayer2}
                                rollCount={rollCountPlayer2}
                                setRollCount={setRollCountPlayer2}
                                pickDie={pickDie}
                                rollDice={rollDice}
                            />
                        </div>

                    </div>
                    {addsEl}
                </div>
            </div>
        </>
    );
}
