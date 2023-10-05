import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "./Navigation.css";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const isUserAuth = user?.id ? true : false;
  const { setUserSession } = useContext(AuthContext);

  const logoutFnc = () => {
    setUserSession({});
    localStorage.clear();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Your Logo" width={90} />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        {isUserAuth
          ?
          <>
            <li>
              <Link to="/add-book">Add Book</Link>
            </li>
            <li>
              <Link to="/add-author">Add Author</Link>
            </li>
          </>
          :
          null
        }
      </ul>
      {!isUserAuth
        ?
        (
          <div className="user-actions">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )
        :
        (
          <li className="nav-links">
            <span style={{ marginRight: '10px' }}>Hello, {user.username}</span>
            <Link to="/" onClick={logoutFnc}>
              Logout
            </Link>
          </li>
        )}
    </nav>
  );
};

export default NavBar;
