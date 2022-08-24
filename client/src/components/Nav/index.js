import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';

function Nav () {

    const logout = () => {
        auth.logout();
    }
  
    return (
      <header className="bg-secondary mb-4 py-2 flex-row align-center">
        <div className="container flex-row justify-space-between-lg justify-center align-center">
          <a href='/'>Game Quest</a>
  
            <nav className="text-center">
                <ul>
                    {/* <li>
                        <Link to="/Login"> LogIn </Link>
                    </li> */}
                    <li>
                        <Link to="/"> Home </Link>
                    </li>
                    <li>
                        <Link to="/privateEvents">PrivateEvents</Link>
                    </li>
                    <li>
                        <Link to="/myprofile">MyProfile</Link>
                    </li> 
                    <li>
                        <Link to='/' onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
      </header>
    );
};

export default Nav;