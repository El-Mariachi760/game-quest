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
                    <div>
                    <li className="created-event" key={data.title}>
                        <div class="event-title">
                            {data.title}
                        </div>
                        <div>
                            Event type: {data.type}
                        </div>
                        <div>
                            When: {data.date}
                        </div>
                        <div>
                            Where: {data.location}
                        </div>
                        <div>
                            Game: {data.game}
                        </div>
                        <div>
                        Guest List: {data.signedPeople.length}/{data.maxPeople}
                            </div>
                        <button className="rsvp-button" onClick={event => rsvpToEvent(event, data._id)} disabled={reserveButtonDisable}>RSVP</button>
                        
                    </li>
                    <div className='space'></div>
                    </div>
                ))
            }
            </ul>
        </div>
    )
}

export default EventList;