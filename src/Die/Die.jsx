import './Die.css'

function Die(props) {
    return (
        <>
            <div className='die-face'>
                <h2 className="die-num" onClick={()=> props.handleClick(props.id, props.value)}>{props.value}</h2>
            </div>
        </>
    )
}

export default Die
