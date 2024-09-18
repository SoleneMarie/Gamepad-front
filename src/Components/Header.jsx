import MainLogo from "../pictures/header-pic.png";

const Header = () => {
  return (
    <header>
      <p>GAMEPAD</p>
      <div>
        <img src={MainLogo} />
      </div>
      <div className="login-space">
        <button>LOG IN</button>
        <button>SIGN UP</button>
      </div>
    </header>
  );
};

export default Header;
