import { useState, useEffect } from 'react';
import './Timer.css'

function Timer({ gameWon }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTime = useRef(null);
    const timer = useRef(null);

    function startTimer() {
        startTime.current = Date.now();
        timer.current = setInterval(() => {
          const elapsedMilliseconds = Date.now() - startTime.current;
          const elapsedSeconds = elapsedMilliseconds / 1000;
          setElapsedTime(elapsedSeconds.toFixed(3));
        }, 1); 
    }

    // cleanup function
    useEffect(() => {
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }, []);

    useEffect(() => {
        if(gameWon === null) {
            startTimer();
        }
    }, [gameWon]);

    return (
        <p>{elapsedTime}</p>
    )
}

export default Timer;
