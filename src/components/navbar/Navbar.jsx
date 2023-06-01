import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <img width="64" height="64" src="https://img.icons8.com/nolan/64/react-native.png" alt="react-native" />
      <Link to="/" className="navbar__brand">
        Kanban Board
      </Link>
    </nav>
  );
};

export default Navbar;