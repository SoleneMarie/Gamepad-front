import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import OneGame from "./Routes/OneGame";
import Genres from "./Routes/Genres";
import GamesGenre from "./Routes/GamesGenre";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<OneGame />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/games/:genre" element={<GamesGenre />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
