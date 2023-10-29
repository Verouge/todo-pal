const userService = require("../../Services/userService");

const userResolvers = {
  Query: {
    async getUserById(_, { id }) {
      return await userService.getUser(id);
    },

    async getUserByEmail(_, { email }) {
      return await userService.getUserWithMail(email);
    },
  },

  Mutation: {
    async registerUser(_, { input }) {
      return await userService.register(input);
    },

    async loginUser(_, { email, password }) {
      return await userService.login(email, password);
    },
  },
};

module.exports = userResolvers;
