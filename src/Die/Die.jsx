import './Die.css'

function Die(props) {
    const pickState = props.isPicked
    const styles = {backgroundColor: pickState? "#59E391": "white"}
    return (
        <>
            <div className='die-face' style={styles}>
                <h2 className="die-num" onClick={()=> props.handleClick(props.id, props.value)}>{props.value}</h2>
            </div>
        </>
    )
}

export default Die
