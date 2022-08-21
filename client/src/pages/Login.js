import React from 'react';
import coverImage from '../assets/pool.jpg';

function logIn() {
    return (
      <section className="about1">
        <img src={coverImage} className="my-2" style={{ width: "100%" }} alt="cover" />
        <h1 id="about">GameQuest</h1>
        <div className="about2">
          <p>
          Whatever you're looking to do for fun, GameQuest can help. 
          People have turned to GameQuest to meet people, make friends, find local activities, and even grow a business. 
          Thousands of events are happening every day. What are you waiting for to join the fun?
          </p>
          
        </div>
      </section>
    );
  }
  
  export default logIn;