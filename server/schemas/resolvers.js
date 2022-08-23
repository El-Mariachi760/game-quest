const { User, Event } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

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

const resolvers = {
  Query: {
    users: async () => {
      return User.find({ type: "user" });
    },

    businessUsers: async () => {
      return User.find({ type: "business" });
    },

    getUser: async (parent, { username }) => {
      return User.findOne({ username });
    },

    getMe: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    events: async () => {
      return Event.find();
    },

    privateEvents: async () => {
      return Event.find({ type: "private" });
    },

    publicEvents: async () => {
      return Event.find({ type: "public" });
    },

    eventById: async (parent, { _id }) => {
      return Event.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    editUser: async (parent, args, context) => {
      const user = await User.findOneAndUpdate(
        { username: context.user.username },
        { args },
        { new: true }
      );

      return user;
    },

    deleteUser: async (parent, args, context) => {
      const user = await User.findOneAndDelete({ username: args.username });

      return user;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    sendFriendRequest: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { friendRequest: context.user._id } },
          { new: true }
        ).populate("friendRequest");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    followUser: async (parent, {followId}, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { following: businessId } },
              { new: true }
            ).populate("following");
    
            return updatedUser;
          }
    
          throw new AuthenticationError("You need to be logged in!");

    },

    unfollowUser: async (parent, {unfollowId}, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { following: businessId } },
              { new: true }
            ).populate("following");
    
            return updatedUser;
          }
    
          throw new AuthenticationError("You need to be logged in!");
    },

    acceptFriendRequest: async (parent, {friendId}, context) => {
        if (context.user) {
            //update user accepting friend request 
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { friendRequest: friendId }, $addToSet:{friends: friendId} },
              { new: true }
            ).populate("friends");

            //add user accepting request to the friend list of user sending request
            const updatedFriend = await User.findOneAndUpdate(
                {_id: friendId },
                {$addToSet: {friends: context.user._id}},
                {new: true }
            );


    
            return updatedUser;
          }
    
          throw new AuthenticationError("You need to be logged in!");
    },

    denyFriendRequest: async (parent, {friendId}, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { friendRequest: friendId } },
              { new: true }
            ).populate("friendRequest");
    
            return updatedUser;
          }
    
          throw new AuthenticationError("You need to be logged in!");
    },

    addEvent: async (parent, args, context) => {},

    editEvent: async (parent, args, context) => {},

    deleteEvent: async (parent, args, context) => {},
  },
};

module.exports = resolvers;
