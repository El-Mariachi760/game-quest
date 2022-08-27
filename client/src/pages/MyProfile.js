import React from 'react';
import FriendList from '../components/FriendList';
import Nav from '../components/Nav';
import RSVPEvents from '../components/RSVPEvents';
import ProfileBio from '../components/ProfileBio';
import FriendRequest from '../components/FriendRequests';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import auth from '../utils/auth';

function MyProfile() {
    const username = auth.getProfile().data.username
    const { loading, data } = useQuery(QUERY_ME);

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
            <FriendList friendCount={data.getMe.friendCount} username={username} friends={data.getMe.friends}/>  
          </div>
          <div>
            <h2>Friend Requests</h2>
            <FriendRequest data={data.getMe.friendRequest} />
          </div>

        </div>

        <div>
          <RSVPEvents data={data}/>
        </div>
      </div>
      </section>
    );
  }
  
  export default MyProfile;