import { useState, useEffect } from 'react'; // Don't forget to import React
import './Timer.css'
import PropTypes from 'prop-types';

function Timer({ isRunning }) {
  const [passedTime, setPassedTime] = useState(0)
  //Prop validation
  Timer.propTypes = {
    isRunning: PropTypes.bool,
    handleClick: PropTypes.func.isRequired,
  }  

  useEffect(() => {
    let interval;
    if (isRunning) {
      const startTime = Date.now() - passedTime;
      interval = setInterval(() => {
        setPassedTime(Date.now() - startTime);
      }, 1);
    } else if (isRunning === false) {
      clearInterval(interval);
      setPassedTime(0); // Reset timer if stopped
    }

    return () => clearInterval(interval);
  }, [isRunning, passedTime]);

  const time = (passedTime / 1000).toFixed(3)

  return (
    <div className='timer-container'>
      <h2 className='timer'>Time: {time}s ⏰</h2>
    </div>
  )
}

export default Timer;
