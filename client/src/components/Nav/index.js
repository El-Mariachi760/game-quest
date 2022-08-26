import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';

function Nav () {

    const logout = () => {
        auth.logout();
    }
  
    return (
      <header className="flex-row">
        <div className="container flex-row justify-space-between align-center">
            <a className="game-quest" href='/'>
                <h1>Game Quest</h1>
            </a>
            <form className='search-bar flex-row'>
                <input className='find-friends' type="text" placeholder="Find your friends!"></input>
                <div className='small-space'></div>
                <button type="submit" className="search-button">
                    <span className="oi oi-magnifying-glass"></span>    
                </button>
            </form>
            <nav className="text-center">
                <ul className='nav-links'>
                    {/* <li>
                        <Link to="/Login"> LogIn </Link>
                    </li> */}

                    
                    <li >
                        <Link to='/' onClick={logout}>Logout</Link>
                    </li>
                    <li>
                        <Link to="/myprofile">My Profile</Link>
                    </li> 
                    <li>

                        <Link to="/privateEvents">Add Event!</Link>

                    </li>

                </ul>
                    {/* <input type="text" placeholder="Find your friends"></input> */}
            </nav>
        </div>
      </header>
    );
};

export default Nav;