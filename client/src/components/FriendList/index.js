import React from 'react';
import { Link } from 'react-router-dom';

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
          friends.map((data) => {
            const friendLink = '/profile' + data.username;
            return (
              <div>
                <Link key={data._id} to={friendLink}>{data.username}</Link>
              </div>
            )  
          })
        }
      </div>
    );
};
  
  export default FriendList;