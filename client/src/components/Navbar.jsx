import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return <nav className="navbar bg-dark container">
    <h4><Link className="link" to="/">Home</Link></h4>
    <h4><Link className="link" to="/list">Coins</Link></h4>
    <h4><Link className="link" to="/curatedList">Your List</Link></h4>
    <h4><Link className="link" to="/about">About</Link></h4>
    <h4><Link className="link" to="/register">Register</Link></h4>
    <h4><Link className="link" to="/login">Login</Link></h4>
    <h4><Link className="link" to="/logout">Logout</Link></h4>
  </nav>
}

export default Navbar;