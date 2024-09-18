import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
const LeftMenu = () => {
  return (
    <nav className="menu">
      <Link to="/">
        <button>HOME</button>
      </Link>
      <Link to="/genres">
        <button>GENRES</button>
      </Link>
      <button>PLATFORMS</button>
      <button>REVIEWS</button>
      <button>STORE</button>
    </nav>
  );
};
export default LeftMenu;
