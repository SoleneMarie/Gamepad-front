import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import OneGame from "./Routes/OneGame";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<OneGame />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
