import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../utils/queries';

function Home() {
    // const form1 = SignUp
    const { loading, data } = useQuery(QUERY_ALL_EVENTS);
    if(!loading){
      console.log(data);
    }
      return (
        <div>
            <h1>Main</h1>
        </div>
      );
    }
    
    export default Home;