// Event model
// import User
const { Schema, model } = require('mongoose');

// Title: String!
// Type: Private/Public
// Date: Date!
// Location: String!
// Description: String!
// Game: String!
// maxPeople: Integer!
// signedPeople: [User]

// Virtual signedPeopleCount: returns length of signedPeople array.

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;