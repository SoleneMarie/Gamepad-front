import MainLogo from "../pictures/header-pic.jpeg";

const Header = () => {
  return (
    <header>
      <section className="first-line-header">
        <div className="title-header">
          <p>GAMEPAD</p>
        </div>
        <div className="header-img">
          <img src={MainLogo} />
        </div>
      </section>
    </header>
  );
};

export default Header;
