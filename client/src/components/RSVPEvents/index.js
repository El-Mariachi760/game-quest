import React from "react";
import EventList from "../EventList";


function RSVPEvents ({ data }) {
    
    return (
        <div>
            <h2>RSVP Events</h2>
            <EventList data={data.getMe.signedEvents} queryMe='true'></EventList>
        </div>
    )
}

export default RSVPEvents