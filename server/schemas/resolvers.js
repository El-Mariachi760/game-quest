const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
            return User.find({type: "user"})
            .populate('createdEvents')
            .populate('signedEvents')
            .populate('friendRequest')
            .populate('friends')
            .populate('followers')
            .populate('following')
        },

        businessUsers: async () => {
            return User.find({type: "business"})
            .populate('createdEvents')
            .populate('signedEvents')
            .populate('friendRequest')
            .populate('friends')
            .populate('followers')
            .populate('following');
        },

        getUser: async (parent, { username }) => {
            return User.findOne({ username })
            .populate('createdEvents')
            .populate('signedEvents')
            .populate('friendRequest')
            .populate('friends')
            .populate('followers')
            .populate('following')
        },

        getMe: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id })
                .populate('createdEvents')
                .populate('signedEvents')
                .populate('friendRequest')
                .populate('friends')
                .populate('followers')
                .populate('following')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        events: async () => {
            return Event.find()
            .populate('signedPeople');
        },

        privateEvents: async () => {
            return Event.find({ type: "private" })
            .populate('signedPeople');
        },

        publicEvents: async () => {
            return Event.find({ type: "public" })
            .populate('signedPeople');
        },

        eventById: async (parent, { _id }) => {
            return Event.findOne({ _id })
            .populate('signedPeople')
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        editUser: async (parent, { username, email, password}, context) => {
            if(context.user) {
                const user = await User.findOneAndUpdate(
                    { username: context.user.username },
                    { username, email, password },
                    { new: true }
                )

                return user;
            }
            
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteUser: async ( parent, args, context ) => {
            const user = await User.findOneAndDelete(
                { username: args.username }
            )

            return user;
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
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
                { $addToSet: { following: followId } },
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
                { $pull: { following: unfollowId } },
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

        removeFriend: async (parent, {friendId}, context) => {
            if (context.user) {
                //update user accepting friend request 
                const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { friends: friendId } },
                { new: true }
                ).populate("friends");
    
                //add user accepting request to the friend list of user sending request
                const updatedFriend = await User.findOneAndUpdate(
                    {_id: friendId },
                    {$pull: {friends: context.user._id}},
                    {new: true }
                );
    
    
        
                return updatedUser;
            }
        
            throw new AuthenticationError("You need to be logged in!");
        },
      
        followUser: async (parent, {followId}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { following: followId } },
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
                { $pull: { following: unfollowId } },
                { new: true }
                ).populate("following");
        
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

        addEvent: async (parent, args, context) => {
            if(context.user){
                const event = await Event.create(args);

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { createdEvents: event._id } },
                    { new: true }
                )

                return event;    
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        editEvent: async (parent, { eventId, title, type, date, location, description, game, maxPeople }, context) => {
            const event = await Event.findByIdAndUpdate(
                { _id: eventId },
                { title, type, date, location, description, game, maxPeople },
                { new: true }
            );

            return event;
        },

        deleteEvent: async (parent, { eventId }, context) => {
            if(context.user){
                const event = await Event.findByIdAndDelete(eventId);

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { createdEvents: event._id } },
                    { new: true }
                )

                return event;    
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        signupForEvent: async (parent, { eventId }, context) => {
            if(context.user){
                const event = await Event.findByIdAndUpdate(
                    { _id: eventId },
                    { $push: { signedPeople: context.user._id } },
                    { new: true }
                )
                .populate('signedPeople');

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { signedEvents: eventId } },
                    { new: true }
                )

                return event;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeSignup: async (parent, { eventId, userId }, context) => {
            const event = await Event.findByIdAndUpdate(
                { _id: eventId },
                { $pull: { signedPeople: userId } },
                { new: true }
            )
            .populate('signedPeople');

            await User.findByIdAndUpdate(
                { _id: userId },
                { $pull: { signedEvents: eventId } },
                { new: true }
            )

            return event;
            
        }
    }
};

module.exports = resolvers;