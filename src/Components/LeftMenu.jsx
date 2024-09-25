import { Link } from "react-router-dom";

const LeftMenu = ({ token, id, logoutFunc }) => {
  return (
    <>
      <section className="all-menu" id="all-menu">
        <nav className="menu">
          <Link to="/">
            <button className="menu-button">HOME</button>
          </Link>
          <Link to="/genres">
            <button className="menu-button">GENRES</button>
          </Link>
        </nav>
        <nav className="menu">
          <Link to="/platforms">
            <button className="menu-button">PLATFORMS</button>
          </Link>
          <Link to="/stores">
            <button className="menu-button">STORES</button>
          </Link>
        </nav>
        {token ? (
          <nav className="menu" id="logs">
            <Link to={`/user/profile/${id}`}>
              <button className="menu-button-green">MY PAD</button>
            </Link>
            <button
              onClick={() => {
                logoutFunc();
              }}
              className="menu-button-logout"
            >
              LOG OUT
            </button>
          </nav>
        ) : (
          <nav className="menu" id="logs">
            <Link to="/user/login">
              <button className="menu-button-green">LOG IN</button>
            </Link>
            <Link to="/user/signup">
              <button className="menu-button-green">SIGN UP</button>
            </Link>
          </nav>
        )}
      </section>
    </>
  );
};
export default LeftMenu;
