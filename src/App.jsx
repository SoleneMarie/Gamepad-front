import "./CSS/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./Routes/Home";
import OneGame from "./Routes/OneGame";
import Genres from "./Routes/Genres";
import GamesGenre from "./Routes/GamesGenre";
import Platforms from "./Routes/Platforms";
import Stores from "./Routes/Stores";
import SignUp from "./Routes/SignUp";
import Profile from "./Routes/Profile";
import Login from "./Routes/Login";
import WrongWay from "./Routes/WrongWay";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [id, setId] = useState(Cookies.get("id") || null);
  const [search, setSearch] = useState("");

  /* --------- Ma fonction qui gère le token et le 🍪 -------- */

  const cookieFunc = (token, id) => {
    if (token) {
      Cookies.set("token", token, { expires: 30 });
      setToken(token);
      console.log("token registered");
      Cookies.set("id", id, { expires: 30 });
      setId(id);
    } else {
      Cookies.remove("token");
      setToken(null);
      Cookies.remove("id");
      setId(null);
      console.log("token removed");
    }
  };
  /* ---------------------------------------------------------- */
  /* ------------ Ma fonction pour se déconnecter ------------- */

  const logoutFunc = () => {
    Cookies.remove("token");
    setToken(null);
    setId("");
  };
  /* ---------------------------------------------------------- */

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                token={token}
                id={id}
                logoutFunc={logoutFunc}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route
            path="/game/:id"
            element={
              <>
                <OneGame token={token} id={id} logoutFunc={logoutFunc} />
              </>
            }
          />
          <Route
            path="/game/:id/screenshots"
            element={<OneGame token={token} id={id} logoutFunc={logoutFunc} />}
          />
          <Route
            path="/genres"
            element={<Genres token={token} id={id} logoutFunc={logoutFunc} />}
          />
          <Route
            path="/games/:genres"
            element={
              <GamesGenre
                token={token}
                id={id}
                logoutFunc={logoutFunc}
                search={search}
                setSearch={setSearch}
              />
            }
          />
          <Route
            path="/genres/:id"
            element={
              <GamesGenre token={token} id={id} logoutFunc={logoutFunc} />
            }
          />
          <Route
            path="/platforms"
            element={
              <Platforms token={token} id={id} logoutFunc={logoutFunc} />
            }
          />
          <Route
            path="/stores"
            element={<Stores token={token} id={id} logoutFunc={logoutFunc} />}
          />
          <Route
            path="/user/signup"
            element={<SignUp cookieFunc={cookieFunc} />}
          />
          <Route
            path="/user/login"
            element={<Login cookieFunc={cookieFunc} />}
          />
          <Route
            path="/user/profile/:id"
            element={<Profile token={token} logoutFunc={logoutFunc} />}
          />
          <Route path="*" element={<WrongWay />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
