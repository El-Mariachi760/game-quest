import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {ADD_EVENT} from '../../utils/mutations'

export const EventForm = () => {
  //const [text, setText] = useState("");
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [data, setData]= useState({})
  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const [reserveCount, setReserveCount]= useState(0);
  const [reserveButtonDisable, setReserveButtonDisable] = useState(false)
  
const submitEvent = async event => {
    event.preventDefault();
    console.log("submitted!")
    const submittedData ={
        title,
        type,
        date,
        location,
        description
    }

    
    try {
        await addEvent({
            variables: { submittedData },
        });
        
    } catch (e) {
        console.error(e);
    }
    
    
    console.log(submittedData)

    setData(submittedData)
}



function renderEvent(){
    return(
        <div>
            <p className="">Event: {data.title}</p>
            <p>Game: {data.type}</p>
            <p>Date: {data.date}</p>
            <p>Location: {data.location}</p>
            <p>Description: {data.description}</p>
            <button onClick={reserveEvent} disabled={reserveButtonDisable}>RSVP</button>
        </div>


    )
}

function reserveEvent(){ 
    let newCount = reserveCount +1
    setReserveCount(newCount)
    let reserveButtonDisableState  =true
    setReserveButtonDisable(reserveButtonDisableState)
}
    


return (
    <>
    <form className="event-form">
        <h2>Plan your next game night!</h2>
        <label for="event-name">Event name:</label>
        <input
            type="text"
            id="event-name"
            placeholder="EX: Poker at my place!"
            onChange={(e)=>setTitle(e.target.value)}
        />
        <label for="games">What games do you want to play?</label>
        <input
            type="text"
            id="games"
            placeholder="EX: Monopoly and Jenga"
            onChange={(e)=>setType(e.target.value)}
        />
        <label for="event-time">When?</label>
        <input type="datetime-local" id="event-time" name="event-time" onChange={(e)=>setDate(e.target.value)}></input>
        <label for="street-address">Where?</label>
        <input
            type="text"
            id="street-address"
            placeholder="Street Address, City, State, and Zip"
            onChange={(e)=>setLocation(e.target.value)}
            
        />
        {/* <label for="city-state-zip">City, State and Zip:</label>
        <input
            type="text"
            id="city-state-zip"
            placeholder="EX: Portland, OR 97035"
            onChange={(e)=>setCity(e.target.value)}
        /> */}
        <label for="details">Description:</label>
        <input
            type="text"
            id="details"
            placeholder="Details about your event"
            onChange={(e)=>setDescription(e.target.value)}
        />
        <button type="submit" onClick={submitEvent}>Create Event</button>
    </form>

<div> {renderEvent()}</div>

<div> Reservations: {reserveCount}</div>

    </>
  );
};