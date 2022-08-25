import React from 'react';
import coverImage from '../assets/pool.jpg';
// import SignUp from './components/SignUp'
import LoginForm from '../components/LogIn';
import SignUp from '../components/SignUp';
import poker from '../assets/poker.jpg';


function logIn() {
  // const form1 = SignUp
    return (
      <section className='about1'>
        {/* <img src={coverImage} className="pool flex-row" alt="People playing pool." /> */}
        <h1 className='game-quest'>Game Quest</h1>
        <div className="login">
          <img className='poker signup-container' src={poker} alt="People playing poker"></img>
          <div className='signup-container'>
            <LoginForm />
            <div className='space'></div>
            <SignUp />
            <div className='space'></div>
            <div className='about'>
              <p>
              Whatever you're looking to do for fun, GameQuest can help. 
              People have turned to GameQuest to meet people, make friends, find local activities, and even grow a business. 
              Thousands of events are happening every day. Come and join the fun!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}
  
  export default logIn;