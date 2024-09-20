import axios from "axios";
import { useState } from "react";
import Footer from "./Components/Footer";
import LeftMenu from "./Components/LeftMenu";
import Header from "./Components/Header";
import { useNavigate } from "react-router-dom";

const SignUp = ({ cookieFunc }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEighteen, setIsEighteen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(picture);

  /* ------------ Ma fonction quand je soumet le formulaire ------------ */
  const submitFunc = async (event) => {
    event.preventDefault();
    if (isLoading === false) {
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
        const token = response.data.account.token;
        cookieFunc(token);
        setIsLoading(false);
        navigate("/user/profile");
      } catch (error) {
        console.log(error);
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
          <section className="sign-up-form">
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
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="one-form-field">
                <h3>Choose a gorgeous picture</h3>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={(event) => setPicture(event.target.files[0])}
                />
              </div>
              <div className="one-form-field">
                <h3>Nobody looking? Write your password</h3>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="ex : je4(tuao34j-H"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div className="one-form-field">
                <h3>Same old same password</h3>
                <input
                  type="text"
                  id="password-confirm"
                  name="password-confirm"
                  placeholder="ex : je4(tuao34j-H"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>
              <div className="one-form-field">
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
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default SignUp;
