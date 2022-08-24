import React from 'react';
import { Link } from 'react-router-dom';

function Nav () {
  
    return (
      <header className="flex-row">
        <div className="container flex-row justify-space-between align-center">
            <a className="game-quest" href='/'>
                <h1>Game Quest</h1>
            </a>
            <nav className="text-center">
                <ul>
                    {/* <li>
                        <Link to="/Login"> LogIn </Link>
                    </li> */}
                    <input type="text" placeholder="Find your friends"></input>
                    
                    <li>
                        <Link to="/myprofile">My Profile</Link>
                    </li> 
                    <li>
                        <Link to="/privateEvents">Events</Link>
                    </li>
                </ul>
            </nav>
        </div>
      </header>
    );
};

export default Nav;