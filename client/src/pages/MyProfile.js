import React from 'react';
import FriendList from '../components/FriendList';
import Nav from '../components/Nav';
import ProfilePic from '../assets/Profile-pic.jpg'
import ProfileBio from '../components/ProfileBio'

function MyProfile() {

    return (
      
      <section>
        <Nav />
      <div>

          <h1 className='page-title'>My Profile</h1>
        <div className='profilepic'>
        <ProfilePic/>
        </div>

        <div className='Bio'>
          <h2>About Me</h2>
          {/* <ProfileBio/> */}
        </div >
          <FriendList />
        </div>

      </section>
    );
  }
  
  export default MyProfile;