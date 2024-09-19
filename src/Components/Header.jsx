import MainLogo from "../pictures/header-pic.png";

const Header = () => {
  return (
    <header>
      <p>GAMEPAD</p>
      <div>
        <img src={MainLogo} />
      </div>
      <div className="login-space"></div>
    </header>
  );
};

export default Header;
