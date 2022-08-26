import React from 'react';
import FriendList from '../components/FriendList';
import Nav from '../components/Nav';
import RSVPEvents from '../components/RSVPEvents';
import ProfileBio from '../components/ProfileBio'

function MyProfile() {

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
          <h2>Friends List</h2>
          <FriendList />
        </div>

        <div>
          <RSVPEvents/>
        </div>
      </div>
      </section>
    );
  }
  
  export default MyProfile;