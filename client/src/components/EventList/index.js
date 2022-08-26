import React,{ useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_FOR_EVENT, REMOVE_SIGNUP } from '../../utils/mutations';
import auth from '../../utils/auth';



function EventList({ data, queryMe }) {
    const [removeRSVP, {cancelError}] = useMutation(REMOVE_SIGNUP);
    const [rsvp, { error }] = useMutation(SIGNUP_FOR_EVENT);
    const [reserveButtonDisable, setReserveButtonDisable] = useState(false)

    const rsvpToEvent = async (event, id) => {
        event.preventDefault();

        if(queryMe === 'true'){
            const userId = auth.getProfile().data._id;
            try {
                await removeRSVP({
                    variables: {
                        eventId: id,
                        userId
                    },
                });
                console.log("Successfully removed RSVP'ed!")
                
            } catch (e) {
                console.error(e);
            } 
        } else if(queryMe === 'false') {
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
        
    }

    let RSVP = 'RSVP';
    if(queryMe === 'true'){
        RSVP='CANCEL';
    } 
    return (
        <div>
            <ul>
            {
                data.map((data)=> (
                    <div>
                    <li className="created-event" key={data._id}>
                        <div className="event-title">
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
                        <button className="rsvp-button" onClick={event => rsvpToEvent(event, data._id)} disabled={reserveButtonDisable}>{RSVP}</button>
                        
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