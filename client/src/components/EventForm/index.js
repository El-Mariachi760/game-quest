import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {ADD_EVENT} from '../../utils/mutations'

export const EventForm = () => {
  //const [text, setText] = useState("");
  const [event, setEvent] = useState("")
  const [game, setGame] = useState("")
  const [time, setTime] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [details, setDetails] = useState("")
  const [data, setData]= useState({})

  const [reserveCount, setReserveCount]= useState(0);
  const [reserveButtonDisable, setReserveButtonDisable] = useState(false)
  
function submitEvent(e){
    e.preventDefault();
    console.log("submitted!")
    const submittedData ={
        event,
        game,
        time,
        address,
        city,
        details,
    }

    console.log(submittedData)

    setData(submittedData)


}



function renderEvent(){
    return(
        <div>
            <div class="space"></div>
        <div className='created-event'>
            <p className="event-title">{data.event}</p>
            <p>What we're playing: {data.game}</p>
            <p>Time: {data.time}</p>
            <p>Address: {data.address}</p>
            <p>City: {data.city}</p>
            <p>Details: {data.details}</p>
            <button className="rsvp-button" onClick={reserveEvent} disabled={reserveButtonDisable}>RSVP</button>
            <div> Reservations: {reserveCount}</div>
        </div>
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
    <div className="event-form">
    <form >
        <h3 className='form-title'>Plan your next game night!</h3>
        <div className='form-line'>
            <label for="event-name">Event name:</label>
            <input
                type="text"
                id="event-name"
                placeholder="EX: Poker at my place!"
                onChange={(e)=>setEvent(e.target.value)}
            />
        </div>
        <div className='form-line'>
            <label for="games">What games do you want to play?</label>
            <input
                type="text"
                id="games"
                placeholder="EX: Monopoly and Jenga"
                onChange={(e)=>setGame(e.target.value)}
            />
        </div>
        <div className='form-line'>
            <label for="event-time">When?</label>
            <input type="datetime-local" id="event-time" name="event-time" onChange={(e)=>setTime(e.target.value)}></input>
        </div>
        <div className='form-line'>
            <label for="street-address">Where?</label>
            <input
                type="text"
                id="street-address"
                placeholder="Street Address"
                onChange={(e)=>setAddress(e.target.value)}
                
            />
        </div>
        <div className='form-line'>
            <label for="city-state-zip">City, State and Zip:</label>
            <input
                type="text"
                id="city-state-zip"
                placeholder="EX: Portland, OR 97035"
                onChange={(e)=>setCity(e.target.value)}
            />
        </div>
        <div className='form-line'>
            <label for="details">Details:</label>
            <input
                type="text"
                id="details"
                className='details'
                placeholder="Details about your event"
                onChange={(e)=>setDetails(e.target.value)}
            />
        </div>
        <button className='form-button' type="submit" onClick={submitEvent}>Create Event</button>
    </form>
    </div>

<div> {renderEvent()}</div>



    </>
  );
};