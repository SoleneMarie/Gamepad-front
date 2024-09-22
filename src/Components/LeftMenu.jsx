import { Link } from "react-router-dom";

const LeftMenu = ({ token, id, logoutFunc }) => {
  return (
    <>
      {token ? (
        <nav className="menu">
          <Link to={`/user/profile/${id}`}>
            <button>My profile</button>
          </Link>
          <button
            onClick={() => {
              logoutFunc();
            }}
          >
            Log out
          </button>
        </nav>
      ) : (
        <nav className="menu">
          <Link to="/user/login">
            <button>Log in</button>
          </Link>
          <Link to="/user/signup">
            <button>Sign up</button>
          </Link>
        </nav>
      )}

      <nav className="menu">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <Link to="/genres">
          <button>GENRES</button>
        </Link>
        <Link to="/platforms">
          <button>PLATFORMS</button>
        </Link>
        <Link to="/stores">
          <button>STORES</button>
        </Link>
      </nav>
    </>
  );
};
export default LeftMenu;
