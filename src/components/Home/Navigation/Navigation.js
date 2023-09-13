import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/">
          <img src="/logo.png" alt="Your Logo" width={90}/>
      </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/add-book">Add Book</Link></li>
      </ul>
      <div className="user-actions">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>  
    </nav>
  );
}

export default NavBar;