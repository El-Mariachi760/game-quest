import React,{ useState } from 'react';
import { useMutation } from '@apollo/client';
import {SIGNUP_FOR_EVENT} from '../../utils/mutations';



function EventList({ data }) {
    
    const [rsvp, { error }] = useMutation(SIGNUP_FOR_EVENT);
    const [reserveButtonDisable, setReserveButtonDisable] = useState(false)

    const rsvpToEvent = async (event, id) => {
        event.preventDefault();
        try {
            await rsvp({
                variables: {
                    eventId: id
                },
            });
            console.log("Successfully RSVP'ed!")
            
        } catch (e) {
            console.error(e);
        }
    
    }


    return (
        <div>
            <ul>
            {
                data.events.map((data)=> (
                    <li key={data.title}>
                        {data.title}----
                        {data.type}---
                        When: {data.date}---
                        Where: {data.location}---
                        Game: {data.game}---
                        Guest List: {data.signedPeople.length}/{data.maxPeople}
                        <button onClick={event => rsvpToEvent(event, data._id)} >RSVP</button>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default EventList;