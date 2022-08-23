const { gql } = require('apollo-server-express');

// (JWT just means its needs context info from the header request)
// QUERIES: 
// users
// businessUsers
// getUser(id)
// getMe (JWT info)

// events
// privateEvents
// publicEvents
// eventById(id)

// MUTATIONS:
// addUser(email, username, password)
// editUser(email, username, password)
// deleteUser(id)
// login(email, password)
// logout()

// sendFriendRequest(JWT, needs id of requested user)
// acceptFriendRequest(JWT, needs id of requesting user)
// denyFriendRequest(JWT)
// signupForEvent(JWT, id of event)
// resignFromEvent(JWT, id of event)

// followUser(JWT, id of followed user)
// unfollowUser(JWT, id of followed user)

// addEvent(JWT, title, type, date, location, description, game, maxPeople)
// editEvent(JWT, title, type, date, location, description, game, maxPeople)
// deleteEvent(id)

const typeDefs = gql`
    type Event {
        _id: ID
        title: String
        type: String
        date: String
        location: String
        description: String
        game: String
        maxPeople: Int
        signedPeople: [User]
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        type: String
        createdEvents: [Event]
        signedEvents: [Event]
        friendRequest: [User]
        friends: [User]
        followers: [User]
        following: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        businessUsers: [User]
        getUser(username: String!): User
        getMe: User

        events: [Event]
        privateEvents: [Event]
        publicEvents: [Event]
        eventById(_id: ID!): Event
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        editUser(username: String!, email: String!, password: String!): User
        deleteUser(username: String!): User
        login(email: String!, password: String!): Auth
        
        sendFriendRequest(friendId: ID!): User
        followUser(followId: ID!): [User]
        unfollowUser(unfollowId: ID!): [User]

        acceptFriendRequest(friendId: ID!): [User]
        denyFriendRequest(friendId: ID!): User

        addEvent(title: String!, type: String, date: String!, location: String!, description: String!, game: String!, maxPeople: Int!): Event
        editEvent(eventId: ID!, title: String!, type: String!, date: String!, location: String!, description: String!, game: String!, maxPeople: Int!): Event
        deleteEvent(eventId: ID!): Event
        signupForEvent(eventId: ID!): Event
        removeSignup(eventId: ID!, userId: ID!): Event
    }
`;

module.exports = typeDefs;