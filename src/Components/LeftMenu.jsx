import { Link } from "react-router-dom";

const LeftMenu = ({ token, id, logoutFunc }) => {
  return (
    <>
      <nav className="menu">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <Link to="/genres">
          <button>GENRES</button>
        </Link>
      </nav>
      <nav className="menu">
        <Link to="/platforms">
          <button>PLATFORMS</button>
        </Link>
        <Link to="/stores">
          <button>STORES</button>
        </Link>
      </nav>
      {token ? (
        <nav className="menu" id="logs">
          <Link to={`/user/profile/${id}`}>
            <button>MY PAD</button>
          </Link>
          <button
            onClick={() => {
              logoutFunc();
            }}
          >
            LOG OUT
          </button>
        </nav>
      ) : (
        <nav className="menu" id="logs">
          <Link to="/user/login">
            <button>LOG IN</button>
          </Link>
          <Link to="/user/signup">
            <button>SIGN UP</button>
          </Link>
        </nav>
      )}
    </>
  );
};
export default LeftMenu;
