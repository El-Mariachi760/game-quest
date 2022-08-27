import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND, DENY_FRIEND_REQUEST } from '../../utils/mutations';

const FriendRequest = ({ data }) => {
  const [addFriend, {addError}] = useMutation(ADD_FRIEND);
  const [denyFriend, {denyError}] = useMutation(DENY_FRIEND_REQUEST);

  const handleAccept = async (_id) => {
    try {
      const { data } = await addFriend({
        variables: { friendId: _id }
      });
    } catch (e) {
      console.error(e);
    }
  };
  
  const handleDeny = async (_id) => {
    try {
      const { data } = await denyFriend({
        variables: { friendId: _id }
      });
    } catch (e) {
      console.error(e);
    }
  };
  
  if(!data){
      return (
        <h5>No Friend Requests!</h5>
      )
    }

    return (
      <div>
        {
          data.map((request) => (
            <div key={request._id}>
              <h5>{request.username}</h5>
              <button onClick={() => handleAccept(request._id)}>Accept</button>
              <button onClick={() => handleDeny(request._id)}>Deny</button>
            </div>
            
          ))
        }
      </div>
    )
};
  
export default FriendRequest;