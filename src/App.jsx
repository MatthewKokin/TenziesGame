import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Leaderboard from './components/Leaderboard/Leaderboard';
import Computer from './components/Computer/Computer';
import Rules from './components/Rules/Rules';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/computer">Computer</Link>
        <Link to="/ruler">Rules</Link>
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
