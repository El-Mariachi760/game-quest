import React, { useState } from 'react';

export const EventForm = () => {
  const [text, setText] = useState("");

  return (
    <form className="event-form">
        <h2>Plan your next game night!</h2>
        <label for="event-name">Event name:</label>
        <input
            type="text"
            id="event-name"
            placeholder="EX: Poker at my place!"
        />
        <label for="games">What games do you want to play?</label>
        <input
            type="text"
            id="games"
            placeholder="EX: Monopoly and Jenga"
        />
        <label for="event-time">When?</label>
        <input type="datetime-local" id="event-time" name="event-time"></input>
        <label for="street-address">Where?</label>
        <input
            type="text"
            id="street-address"
            placeholder="Street Address"
        />
        <label for="city-state-zip">City, State and Zip:</label>
        <input
            type="text"
            id="city-state-zip"
            placeholder="EX: Portland, OR 97035"
        />
        <label for="details">Details:</label>
        <input
            type="text"
            id="details"
            placeholder="Details about your event"
        />
        <button type="submit">Create Event</button>
    </form>
  );
};