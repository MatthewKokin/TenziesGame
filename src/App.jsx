import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Leaderboard from './components/Leaderboard/Leaderboard';
import Computer from './components/Computer/Computer';
import Rules from './components/Rules/Rules';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Multiplayer from './components/Multiplayer/Multiplayer';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className='all'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multiplayer" element={<Multiplayer/>} />
        <Route path="/leaderboard" element={< Leaderboard />} />
        <Route path="/computer" element={< Computer />} />
        <Route path="/ruler" element={< Rules />} />
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App;
