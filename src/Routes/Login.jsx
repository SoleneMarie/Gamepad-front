import { useState } from "react";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import Header from "../Components/Header";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ cookieFunc }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const idData = {
    username: username,
    password: password,
  };

  const loginFunc = async (event) => {
    event.preventDefault();
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
        cookieFunc(token);
        setIsLoading(false);
        navigate(`/user/profile/${id}`);
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
              <input
                type="text"
                id="password"
                name="password"
                placeholder="ex : je4(tuao34j-H"
                onChange={(event) => {
                  event.preventDefault;
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button>Log in</button>
          </form>
          <p>
            Don't have an account yet?
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
