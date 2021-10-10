import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useCookies } from 'react-cookie';

function Navbar() {

  const [cookie, setCookie, removeCookie] = useCookies(['token', 'loggedIn']);

  const logout = () => {
    removeCookie('token');
    removeCookie('loggedIn');
  }

  let renderThis;

  if(!cookie.loggedIn) {

    renderThis = <div>
                  <nav className="navbar bg-dark container">
                    <h4><Link className="link" to="/">Home</Link></h4>
                    <h4><Link className="link" to="/list">Coins</Link></h4>
                    <h4><Link className="link" to="/register">Register</Link></h4>
                    <h4><Link className="link" to="/login">Login</Link></h4>
                  </nav>
                </div>
  } else {

    renderThis = <div>
                  <nav className="navbar bg-dark container">
                    <h4><Link className="link" to="/">Home</Link></h4>
                    <h4><Link className="link" to="/list">Coins</Link></h4>
                    <h4><Link className="link" to="/curatedList">Your List</Link></h4>
                    <h4><Link onClick={logout} className='link' to='/'>Logout</Link></h4>
                  </nav>
                </div>
  }
  return (
    renderThis
  ) 
}

export default Navbar;