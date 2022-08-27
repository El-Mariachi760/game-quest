import React from 'react';
import { EventForm } from '../components/EventForm';
import Nav from '../components/Nav';


function PrivateEvents() {

    return (
      <div>
        <Nav />
          <h1 className='page-title'>Create an Event</h1>
          <EventForm />
      </div>
    );
  }
  
  export default PrivateEvents;