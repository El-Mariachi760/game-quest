import React from 'react';
import { Link } from 'react-router-dom';

function Nav () {
  
    return (
      <header className="bg-secondary mb-4 py-2 flex-row align-center">
        <div className="container flex-row justify-space-between-lg justify-center align-center">
          <a href='/'>Game Quest</a>
  
            <nav className="text-center">
                <ul>
                    <li>
                        <a href='../pages/Explore.js'>Explore</a>
                    </li>
                    <li>
                        <a href='../pages/PrivateEvents.js'>Private Events</a>
                    </li>
                    <li>
                        <a href='../pages/MyProfile.js'>My Profile</a>
                    </li> 
                </ul>
            </nav>
        </div>
      </header>
    );
};

export default Nav;