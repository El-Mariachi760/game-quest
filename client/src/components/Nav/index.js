import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SEND_FRIEND_REQUEST } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import auth from '../../utils/auth';

function Nav () {
    const [formState, setFormState] = useState('');
    const [sendFriendRequest, { error }] = useMutation(SEND_FRIEND_REQUEST);

    const handleChange = (event) => {
        const { value } = event.target;
    
        setFormState(value);
      }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            sendFriendRequest({
                variables: { username: formState }
            });

            console.log('request sent');
        }catch(e) {
            console.error(e);
        } 
    }

    const logout = () => {
        auth.logout();
    }

    return (
      <header className="flex-row">
        <div className="container flex-row justify-space-between align-center">
            <a className="game-quest" href='/'>
                <h1>Game Quest</h1>
            </a>
            <form className='search-bar flex-row' onSubmit={handleSearchSubmit}>
                <input className='find-friends' type="text" placeholder="Find your friends!" onChange={handleChange} value={formState}></input>
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