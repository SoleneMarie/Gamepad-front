import { useState } from "react";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = ({ cookieFunc }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passType, setPassType] = useState("password");
  const navigate = useNavigate();
  const idData = {
    username: username,
    password: password,
  };

  const loginFunc = async (event) => {
    event.preventDefault();
    setEmptyError(false);
    setPassError(false);
    setUserError(false);
    if (!username || !password) {
      setEmptyError(true);
    }
    if (!isLoading) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/user/login",
          idData
        );

        const id = response.data._id;
        const token = response.data.token;

        console.log("token : ", token);
        cookieFunc(token, id);
        setIsLoading(false);
        navigate(`/user/profile/${id}`);
      } catch (error) {
        if (error.response) {
          if (error.response.data.message === "warning, empty fields") {
            setEmptyError(true);
            setIsLoading(false);
            return;
          }
          if (error.response.data.message === "wrong password") {
            setPassError(true);
            setIsLoading(false);
            return;
          }
          if (
            error.response.data.message ===
            "no account existing for this username"
          ) {
            setUserError(true);
            setIsLoading(false);
            return;
          }
        }

        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <main>
        <LeftMenu />
        <section className="form">
          <h1>Who are you again? </h1>
          <form onSubmit={loginFunc}>
            <div className="one-form-field">
              <h3>Username</h3>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="ex : Tom"
                onChange={(event) => {
                  event.preventDefault;
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="one-form-field">
              <h3>Password</h3>
              <div className="passfield">
                <input
                  type={passType}
                  id="password"
                  name="password"
                  placeholder="ex : je4(tuao34j-H"
                  onChange={(event) => {
                    event.preventDefault;
                    setPassword(event.target.value);
                  }}
                />
                {passType === "password" ? (
                  <div
                    className="pass-icon"
                    onClick={() => setPassType("text")}
                  >
                    <FaEyeSlash />
                  </div>
                ) : (
                  <div
                    className="pass-icon"
                    onClick={() => setPassType("password")}
                  >
                    <FaEye />
                  </div>
                )}
              </div>
            </div>
            <button>Log in</button>
          </form>
          <div className="error-messages">
            {userError && (
              <p className="one-error-message">
                Never heared about this username... <br />
                Maybe you wanted to sign up?
              </p>
            )}

            {passError && (
              <p className="one-error-message">Invalid password : try again!</p>
            )}

            {emptyError && (
              <p className="one-error-message">Please complete all fields!</p>
            )}
          </div>
          <p>
            Don't have an account yet?
            <br />
            <Link to="/user/signup">
              <span>Sign up</span>
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
