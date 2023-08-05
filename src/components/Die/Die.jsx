import './Die.css'

function Die(props) {
    const pickState = props.isPicked
    const styles = {backgroundColor: pickState? "#59E391": "white"}
    return (
        <>
            <div className='die-face' style={styles} onClick={()=> props.handleClick(props.id, props.value)}>
                <h2 className="mb-0 die-num">{props.value}</h2>
            </div>
        </>
    )
}

export default Die
