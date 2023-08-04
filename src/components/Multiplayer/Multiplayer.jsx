import './Multiplayer.css'
import { useEffect, useRef, useState } from 'react'
import Confetti from "react-confetti"
import sound from '../../assets/win.mp3';
import gif from '../../assets/winningGif.gif';
import { generateTenDice, generateNewDie } from '../../utils'
import Die from '../Die/Die';

// -----------------------------------


function Home() {
    // diceArray holds the state for all the dice
    const [diceArray, setDiceArray] = useState(generateTenDice())
    // gameWon state shows if the game has been won
    const [gameWon, setGameWon] = useState(null)
    // audioRef is a reference to the win sound
    const [rollCount, setRollCount] = useState(0)
    const audioRef = useRef(null)


    // useEffect that checks if the game is won after each dice roll
    useEffect(() => {
        const selectedDice = diceArray.filter(die => die.isPicked)
        if (selectedDice.length === 10) {
            const hasWon = diceArray.every(die => die.num === diceArray[0].num)
            setGameWon(hasWon)
            // clearInterval(timer.current) // stop timer using .current
        }
    }, [diceArray])

    // Updates the isPicked property of a die
    function pickDie(id) {
        setDiceArray(oldArr => oldArr.map(die => die.id === id ? { ...die, isPicked: !die.isPicked } : die));
    }

    // Roll all dice that are not picked. If the game has been won, reset it.
    function rollDice() {
        //🥳New game state
        if (gameWon === null) {
            setGameWon(false)
            setDiceArray(generateTenDice());
            // startTimer();  // calling the startTimer function here 
        }
        //🎲 Roll state
        else if (!gameWon) {
            setDiceArray(oldArr => oldArr.map(die => die.isPicked ? die : generateNewDie()))
            setRollCount(old => old + 1)
        }
        // 🥲 Finish state
        else if (gameWon) {
            setRollCount(0)
            setGameWon(null)
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

    // Map the diceArray state to Die components
    const diceElements = diceArray.map(die =>
        <Die
            key={die.id}
            id={die.id}
            value={die.num}
            handleClick={pickDie}
            isPicked={die.isPicked}
        />
    );

    // Play or stop audio depending on gameWon state
    useEffect(() => {
        gameWon ? playAudio() : stopAudio();
    }, [gameWon]);

    const addsEl = (
        <div className="col-sm-2 sidenav p-0 bg-info-subtle">
            <div className="well"><p>ADS</p></div>
            <div className="well"><p>ADS</p></div>
            <div className="well"><p>ADS</p></div>
            <div className="well"><p>ADS</p></div>
        </div>
    )


    return (
        <>
            <div className="container-fluid text-center p-0 main">
                <div className="row content">
                    {addsEl}
                    <div className=" field row col-sm-8 text-left p-0" onClick={finishWinningAnimation}>
                        {gameWon && <Confetti />}
                        {gameWon && <img src={gif} className='winning-img' alt="Winning celebration" />}
                        <h1 className='row'>Tenzies</h1>
                        <p className='row'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

                        <div className='players-area row'>
                            {/* Player 1 */}
                            <div className='play-area col-6'>
                                <div className='stats'>
                                    <h2 className='rolls'>Rolls: {rollCount} 🎲</h2>
                                </div>
                                <div className='dice-container col-md-8'>
                                    {diceElements}
                                </div>
                            </div>

                            {/* Player 2 */}
                            <div className='play-area col-6 opacity-50'>
                                <div className='stats'>
                                    <h2 className='rolls'>Rolls: {rollCount} 🎲</h2>
                                </div>
                                <div className='dice-container col-md-8'>
                                    {diceElements}
                                </div>
                            </div>
                        </div>

                        <button onClick={rollDice}> {gameWon === null ? "🥳 New game" : (gameWon === false ? "🎲 Roll" : "🥲 Finish")}</button>
                    </div>
                    {addsEl}
                </div>
            </div>
        </>
    )
}

export default Home;
