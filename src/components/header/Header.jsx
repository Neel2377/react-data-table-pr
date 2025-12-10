import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ logout, handleSearch }) {
  const location = useLocation();
  const isDisabled = location.pathname === "/";

  return (
    <nav className="navbar-container">
      <div className="inner">
        <NavLink className="brand" to="/">
          EMP
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className="link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="link">
              About
            </NavLink>
          </li>
        </ul>

        <div className="actions">
          <input
            type="text"
            placeholder="Search by Name"
            className="search"
            onChange={handleSearch}
            disabled={isDisabled}
          />

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
