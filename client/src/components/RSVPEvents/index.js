import React from "react";
import EventList from "../EventList";
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import auth from '../../utils/auth';

function RSVPEvents () {
    const username = auth.getProfile().data.username
    const { loading, data } = useQuery(QUERY_ME);

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div>
            <h2>RSVP Events</h2>
            <EventList data={data.getMe.signedEvents} queryMe='true'></EventList>
        </div>
    )
}

export default RSVPEvents