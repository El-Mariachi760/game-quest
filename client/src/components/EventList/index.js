import React from 'react';



function EventList({ data }) {
    return (
        <div>
            <ul>
            {
                data.events.map((data)=> (
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