import { Link } from "react-router-dom";

const LeftMenu = () => {
  return (
    <>
      <nav className="menu">
        <button>Log in</button>
        <button>Sign up</button>
      </nav>
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
