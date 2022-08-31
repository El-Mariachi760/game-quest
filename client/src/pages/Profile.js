import React from 'react';
import FriendList from '../components/FriendList';
import Nav from '../components/Nav';
import RSVPEvents from '../components/RSVPEvents';
import ProfileBio from '../components/ProfileBio';
import FriendRequest from '../components/FriendRequests';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import auth from '../utils/auth';
import { useParams, Navigate } from 'react-router-dom';

function Profile() {
    const { username } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username }
    });

    if(auth.loggedIn() && auth.getProfile().data.username === username) {
        return <Navigate to='/myprofile'></Navigate>
    }

    if(loading){
      return (
          <h1>Loading...</h1>
      )
    }
    return (
      
      <section>
        <Nav />
      <div>

        <h1 className='page-title'>My Profile</h1>
        <div className='profilepic'>
        {/* <ProfilePic/> */}
        </div>

        <div className='Bio'>
          <h2>About Me</h2>
          {/* <ProfileBio/> */}
        </div >
        <div>
          <div>
            <h2>Friends List</h2>
            <FriendList friendCount={data.getUser.friendCount} username={username} friends={data.getUser.friends}/>  
          </div>

        </div>

        <div>
          <RSVPEvents data={data.getUser}/>
        </div>
      </div>
      </section>
    );
  }
  
  export default Profile;