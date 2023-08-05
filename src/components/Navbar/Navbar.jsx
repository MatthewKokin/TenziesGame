import './Navbar.css'
import { Link } from "react-router-dom"

function Navbar() {
    const styles = {backgroundColor: "#D3CDFE"}
    return (
        <div className='navbar-main container-fluid p-0'>
            <nav className="navbar navbar-expand-sm" style={styles}>
                <div className="container-fluid">
                    <Link to="/" className='navbar-brand'>Tenzies</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/multiplayer" className='nav-link'>Multiplayer</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/leaderboard" className='nav-link'>Leaderboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/computer" className='nav-link'>Computer</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/ruler" className='nav-link'>Rules</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
