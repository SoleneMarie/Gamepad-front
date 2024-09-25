import axios from "axios";
import { useState } from "react";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiFillPicture } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = ({ cookieFunc }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEighteen, setIsEighteen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [conflictUser, setConflictUser] = useState(false);
  const [conflictMail, setConflictMail] = useState(false);
  const [passType, setPassType] = useState("password");
  const navigate = useNavigate();

  /* ------------ Ma fonction quand je soumet le formulaire ------------ */
  const submitFunc = async (event) => {
    event.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    setMailError(false);
    setConfirmPassError(false);
    setEmptyError(false);
    setConflictUser(false);
    setConflictMail(false);
    if (isLoading === false) {
      if (!username || !email || !password || !confirmPassword) {
        setEmptyError(true);
        return;
      }
      if (username.length < 4) {
        setUsernameError(true);
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        setMailError(true);
        return;
      }
      if (password.length < 10) {
        setPasswordError(true);
        return;
      }
      if (password !== confirmPassword) {
        setConfirmPassError(true);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        {
          picture && formData.append("picture", picture);
        }
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("isEighteen", isEighteen);
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:3000/user/signup",
          formData
        );
        console.log(response.data);
        const id = response.data.id;

        const token = response.data.account.token;
        cookieFunc(token, id);
        setIsLoading(false);

        navigate(`/user/profile/${id}`);
      } catch (error) {
        console.log(error);
        let errorResponse = error.response.data.message;
        if (errorResponse === "warning, account existing for this username") {
          setConflictUser(true);
          setIsLoading(false);
          return;
        }
        if (errorResponse === "warning, account existing for this email") {
          setConflictMail(true);
          setIsLoading(false);
          return;
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
        <section className="sign-up">
          <h1>Your character sheet </h1>
          <section className="sign-form">
            <form onSubmit={submitFunc}>
              <div className="one-form-field">
                <h3>Choose your username</h3>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="ex : Tom"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="one-form-field">
                <h3>Give us your best email</h3>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="ex : tom@game.com"
                  onClick={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="one-form-field">
                <h3>Your gorgeous picture</h3>
                <label className="file-button" htmlFor="picture">
                  <AiFillPicture />
                </label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={(event) => setPicture(event.target.files[0])}
                />
                {picture && <p>Fichier sélectionné : {picture.name}</p>}
              </div>
              <div className="one-form-field">
                <h3>Write your password</h3>
                <div className="passfield">
                  <input
                    type={passType}
                    id="password"
                    name="password"
                    placeholder="ex : je4(tuao34j-H"
                    onChange={(event) => {
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
              <div className="one-form-field">
                <h3>Same old same password</h3>
                <div className="passfield">
                  <input
                    type={passType}
                    id="password-confirm"
                    name="password-confirm"
                    placeholder="ex : je4(tuao34j-H"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
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
              <div id="adult-class" className="one-form-field">
                <h3>Are you an adult?</h3>
                <input
                  type="checkbox"
                  id="adult"
                  name="adult"
                  onClick={() => {
                    isEighteen ? setIsEighteen(false) : setIsEighteen(true);
                  }}
                />
              </div>
              <button>Create your profile</button>
            </form>
            <div className="error-messages">
              {conflictUser && (
                <p className="one-error-message">
                  Character sheet existing for this username! <br /> If you
                  already have an account : did you see our login button?
                </p>
              )}
              {conflictMail && (
                <p className="one-error-message">
                  Character sheet existing for this email! <br /> If you already
                  have an account, did you see our login button?
                </p>
              )}
              {usernameError && (
                <p className="one-error-message">
                  Please choose a valid username : four characters minimum !
                </p>
              )}
              {mailError && (
                <p className="one-error-message">Please enter a valid email!</p>
              )}
              {passwordError && (
                <p className="one-error-message">
                  Please enter a valid password : ten characters minimum!
                </p>
              )}
              {confirmPassError && (
                <p className="one-error-message">
                  Your passwords are not the same!
                </p>
              )}
              {emptyError && (
                <p className="one-error-message">Please complete all fields!</p>
              )}
            </div>
            <p>
              Already have an account? <br />
              <Link to="/user/login">
                <span>Log in</span>
              </Link>
            </p>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default SignUp;
