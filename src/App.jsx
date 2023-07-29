import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Leaderboard from './components/Leaderboard/Leaderboard';
import Computer from './components/Computer/Computer';
import Rules from './components/Rules/Rules';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <nav className='navbar nav-custom'>
        <h2 className='nav-link badge bg-primary logo'>Tenzies</h2>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/leaderboard" className='nav-link'>Leaderboard</Link>
        <Link to="/computer" className='nav-link'>Computer</Link>
        <Link to="/ruler" className='nav-link'>Rules</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={< Leaderboard/>} />
        <Route path="/computer" element={< Computer/>} />
        <Route path="/ruler" element={< Rules/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
