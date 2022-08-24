import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_EVENTS } from '../../utils/queries';



function EventList() {
        // const form1 = SignUp
        const { loading, error, data } = useQuery(QUERY_ALL_EVENTS);
        if(!loading){
          console.log(data);
        }
        if (!error) return "Error";
        if (!data) console.log(data)

    return (
        <div>
            <ul>
            {
                data.QUERY_ALL_EVENTS.map((data)=> (
                    <li key={data.title}>
                        {data.title}----
                        {data.type}---
                        {data.date}---
                        {data.location}---
                        {data.game}---
                        {data.maxPeople}

                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default EventList;