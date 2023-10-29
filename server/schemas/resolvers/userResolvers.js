const bcrypt = require("bcryptjs");
const userModel = require("../../Models/userModel");
const { createRandomHexColor } = require("../helperMethods");
const auth = require("../Middlewares/auth");

const userResolvers = {
  Query: {
    async getUserById(_, { id }) {
      try {
        const user = await userModel.findById(id);
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    async getUserByEmail(_, { email }) {
      try {
        const user = await userModel.findOne({ email });
        return {
          name: user.name,
          surname: user.surname,
          color: user.color,
          email: user.email,
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Mutation: {
    async registerUser(_, { input }) {
      const { name, surname, email, password } = input;

      // Password hashing
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create new user
      const newUser = new userModel({
        name,
        surname,
        email,
        password: hashedPassword,
        color: createRandomHexColor(),
      });

      try {
        await newUser.save();
        const token = auth.generateToken(newUser._id.toString(), newUser.email);
        return { user: newUser, token };
      } catch (err) {
        throw new Error("Email already in use!");
      }
    },

    async loginUser(_, { email, password }) {
      try {
        const user = await userModel.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password!");
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password!");
        }

        const token = auth.generateToken(user._id.toString(), user.email);
        return { user, token };
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = userResolvers;
