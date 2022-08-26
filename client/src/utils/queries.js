import { gql } from '@apollo/client';

export const QUERY_ALL_EVENTS = gql`
  query events{
    events {
      _id
      title
      date
      description
      signedPeople {
        _id
        username
      }
      maxPeople
      game
      location
      type
    }
  }
`;

export const QUERY_EVENTS = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      createdEvents {
        _id
        title
      }
      signedEvents {
        _id
        title
      }
    }
  }
`;

export const QUERY_EVENT = gql`
  query EventById($id: ID!) {
    eventById(_id: $id) {
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

export const QUERY_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      _id
      username
      email
      friendRequest {
        _id
        username
      }
      friends {
        _id
        username
      }
      friendCount
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    getMe {
      _id
      username
      email
      friendRequest {
        _id
        username
      }
      friends {
        _id
        username
      }
      friendCount
      createdEvents {
        _id
        title
      }
      signedEvents {
        _id
        title
        date
        description
        signedPeople {
          _id
          username
        }
        maxPeople
        game
        location
        type
      }
    }
  }
`;