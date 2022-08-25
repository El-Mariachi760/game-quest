import React from 'react';
import EventList from '../components/EventList';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../utils/queries';
import Nav from '../components/Nav';

function Home() {
    const { loading, data } = useQuery(QUERY_ALL_EVENTS);
    if(loading){
      return (
        <h1>Loading</h1>
      );
    }
      
    return (
        <div>
          <Nav />
          <div className='eventFeed'>
            <div className='Header'>
              <h1 class-name="page-title">Upcoming Events</h1>
            </div>
            <div className='events'>
              <EventList data={data} />
            </div>

          </div>
        </div>
      );
    }
    
    export default Home;