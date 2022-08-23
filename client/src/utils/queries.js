import { gql } from '@apollo/client';

export const QUERY_EVENTS = gql`
  query events($username: String) {
    events(username: $username) {
        _id
        eventName
        games
        eventTime
        eventAddress
        eventCity
        eventDetails
        createdAt
        username
        rsvpCount
      }
    }
  }
`;

export const QUERY_EVENT = gql`
  query event($id: ID!) {
    event(_id: $id) {
        _id
        eventName
        games
        eventTime
        eventAddress
        eventCity
        eventDetails
        createdAt
        username
        rsvpCount
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      friendCount
      events {
        _id
        eventName
        eventTime
        eventAddress
        rsvpCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      friendCount
      events {
        _id
        eventName
        eventTime
        rsvpCount
      }
    }
  }
`;
