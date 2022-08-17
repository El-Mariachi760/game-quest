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
    type User {
        _id: ID
        username: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String!): User
    }
`;

module.exports = typeDefs;