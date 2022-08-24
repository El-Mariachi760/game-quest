import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_ALL_EVENTS } from '../utils/queries';
import Nav from '../components/Nav';
import EventList from '../components/EventList';

function Home() {
    // const form1 = SignUp
    // const { loading, data } = useQuery(QUERY_ALL_EVENTS);
    // if(!loading){
    //   console.log(data);
    // }
      return (
        <div>
          <div className='eventFeed'>
            <div className='Header'>
              <h2>Upcoming Events</h2>
            </div>
            <div className='events'>
              <EventList />
            </div>

          </div>
        </div>
      );
    }
    
    export default Home;