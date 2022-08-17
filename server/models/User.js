// User model
// import Event
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Email: String!
// Username: String!
// Type: Business/User
// Password: String! (bcrypt)
// createdEvents: [Event]
// signedEvents: [Event]
// friendRequest: [User] (list of users who have sent friend requests)
// friends: [User]
// followers: [User]
// following: [User]

// Virtual presave middleware for encrypting password
// Virtual for friend count which return friends array length

//FRIEND REQUEST LOGIC: 
// User A sends friend request to User B, User B gets User A added to their "friendRequest" array. 
// User B gets their friend request area updated with thier friendRequest array. 
// if User B accepts, User B gets added to User A friends array, User A gets added to User B friends array.
// if User B declines, User A gets deleted from User B's friendRequest array, and nothing else happens.


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const User = model('User', userSchema);

module.exports = User;