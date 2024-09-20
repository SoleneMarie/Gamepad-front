import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./Routes/Home";
import OneGame from "./Routes/OneGame";
import Genres from "./Routes/Genres";
import GamesGenre from "./Routes/GamesGenre";
import Platforms from "./Routes/Platforms";
import Stores from "./Routes/Stores";
import GetPicsById from "./Components/GetPicsById";
import SignUp from "./SignUp";
import Profile from "./Routes/Profile";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  /* --------- Ma fonction qui gère le token et le 🍪 -------- */

  const cookieFunc = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 30 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  /* ---------------------------------------------------------- */
  /* ------------ Ma fonction pour se déconnecter ------------- */

  const logoutFunc = () => {
    Cookies.remove("token");
    setToken(null);
  };
  /* ---------------------------------------------------------- */

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
          <Route path="/stores" element={<Stores />} />
          <Route
            path="/user/signup"
            element={<SignUp cookieFunc={cookieFunc} />}
          />
          <Route path="/user/profile" element={<Profile token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
