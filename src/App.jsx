import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import OneGame from "./Routes/OneGame";
import Genres from "./Routes/Genres";
import GamesGenre from "./Routes/GamesGenre";
import Platforms from "./Routes/Platforms";
import Stores from "./Routes/Stores";
import GetPicsById from "./Components/GetPicsById";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/game/:id"
            element={
              <>
                <OneGame />
                <GetPicsById />
              </>
            }
          />
          <Route path="/game/:id/screenshots" element={<OneGame />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/games/:id" element={<GamesGenre />} />
          <Route path="/genres/:id" element={<GamesGenre />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="stores" element={<Stores />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
