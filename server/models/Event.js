// Event model
// import User
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Title: String!
// Type: Private/Public (add validation so it can only be "private" or "public")
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
        },

        type: {
            type: String,
            required: true,
            enum: ['Private', 'Public'],
            default: 'Public'
        },

        date: {
            type: Date,
            required: true,
            get: timestamp => dateFormat(timestamp)
        },

        location: {
            type: String,
            required: true,
            minlength: 1
        }  , 

        description: {
            type: String,
            trim: true,
        },

        game: {
            type: String,
            required: true,
            trim: true
        },

        maxPeople: {
            type: Number,
            required: true,
            min: 1
        },

        signedPeople: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

eventSchema.virtual('signedPeopleCount').get(function() {
    return this.signedPeople.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;