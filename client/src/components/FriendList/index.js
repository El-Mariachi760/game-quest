import React from 'react';

const FriendList = ({ friendCount, username, friends }) => {
    if (!friends || !friends.length) {
      return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
    }
  
    return (
      <div>
        <h5>
          {username} has {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
        </h5>
        {
          friends.map((data) => (
            <h5 key={data._id}>{data.username}</h5>
          ))
        }
      </div>
    );
};
  
  export default FriendList;