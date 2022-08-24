import React from 'react';
import { EventForm } from '../components/EventForm';


function PrivateEvents() {

    return (
      <div>
          <h1 className='page-title'>Upcoming Events</h1>
          <EventForm />
      </div>
    );
  }
  
  export default PrivateEvents;