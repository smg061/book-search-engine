const { createUser, getSingleUser, saveBook, deleteBook, login } = require("../controllers/user-controller");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    books: async ({ params }) => {
      return User.find({});
    },
    user: async (parent, { username, id }) => {
      return User.findOne({ username: username }).populate("savedBooks");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, body) => {
      return login(body);
    },

    saveBook: async (parent, { user, body }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    },
  },
};

module.exports = resolvers;
