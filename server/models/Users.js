// User model
// import Event

// Email: String!
// Username: String!
// Type: Business/User
// Password: String! (bcrypt)
// createdEvents: [Event]
// signedEvents: [Event]
// friends: [User]
// followers: [User]

// Virtual presave middleware for encrypting password
// Virtual for friend count which return friends array length

//IDEA: 
// User A sends friend request to User B, User B gets User A added to their "friendRequest" array. 
// User B gets their friend request area updated with thier friendRequest array. 
// if User B accepts, User B gets added to User A friends array, User A gets added to User B friends array.
// if User B declines, User A gets deleted from User B's friendRequest array, and nothing else happens.



// friendRequest: [User] (list of users who have sent friend requests)
// friends: [User] ()