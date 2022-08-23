import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($username: String!, $email: String!, $password: String!){
    editUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!) {
    deleteUser(username: $username) {
      _id
      username
      email
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $type: String!, $date: String!, $location: String!, $description: String!, $game: String!, $maxPeople: Int!) {
    addEvent(title: $title, type: $type, date: $date, location: $location, description: $description, game: $game, maxPeople: $maxPeople) {
      _id
      title
      type
      date
      location
      description
      game
      maxPeople
      signedPeople {
        _id
        username
      }
    }
  }
`;

export const SIGNUP_FOR_EVENT = gql`
  mutation SignupForEvent($eventId: ID!) {
    signupForEvent(eventId: $eventId) {
      signedPeople {
        _id
        username
        email
      }
      _id
      title
    }
  }
`;

export const REMOVE_SIGNUP = gql`
  mutation RemoveSignup($eventId: ID!, $userId: ID!) {
    removeSignup(eventId: $eventId, userId: $userId) {
      _id
      title
      signedPeople {
        _id
        username
        email
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
      title
      type
      date
      location
      description
      game
      maxPeople
      signedPeople {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation acceptFriendRequest($friendId: ID!) {
    acceptFriendRequest(friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
      friendRequest {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($friendId: ID!) {
    sendFriendRequest(friendId: $friendId) {
      _id
      username
      email
      friendRequest {
        _id
        username
      }
    }
  }
`;

export const DENY_FRIEND_REQUEST = gql`
  mutation DenyFriendRequest($friendId: ID!) {
    denyFriendRequest(friendId: $friendId) {
      _id
      username
      friendRequest {
        _id
        username
      }
    }
  }
`;