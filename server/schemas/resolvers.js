const { createUser, getSingleUser, saveBook, deleteBook, login } = require("../controllers/user-controller");
const {User} = require("../models");
const resolvers = {
  Query: {
    books: async (params) => {
      return Book.find(params);
    },
    user: async (parent, params) => {
      return getSingleUser(params);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, {body}) => {
      return createUser(body);
    },
    login: async (parent, {body}) => {
      return login(body);
    },

    saveBook: async(parent, {user, body}) => {
      return saveBook(body);
    }
  },
};

module.exports = resolvers;
