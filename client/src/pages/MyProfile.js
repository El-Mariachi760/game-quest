import React from 'react';
import FriendList from '../components/FriendList';
import Nav from '../components/Nav';
import ProfilePic from '../assets/ProfilePic'

function MyProfile() {

    return (
      <div>
        
          <Nav />
          <h1>MyProfile</h1>
          <ProfilePic/>
          <FriendList />
      </div>
    );
  }
  
  export default MyProfile;