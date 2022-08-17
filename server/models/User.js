// User model
// import Event
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Email: String!
// Username: String!
// Type: Business/User (add validation so it can only be "business" or "user")
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
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
          },
    },
    {
        type: {
            type: String,
            required: true,
            enum: ['business', 'user']
        }
    },
    {
        password: {
            type: String,
            required: true,
            minlength: 5
        }
    },
    {
        createdEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]
    },
    {
        signedEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ]
    },
    {
        friendRequest: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);


// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;