const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const auth = require("../util/auth");
const { createRandomHexColor } = require("../util/helperMethods");

const userService = {
  register: async (userData) => {
    const { name, surname, email, password } = userData;
    if (!(name && surname && email && password)) {
      throw new Error("Please fill all required areas!");
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use!");
    }

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

    await newUser.save();

    // Generate a token
    const token = auth.generateToken(newUser._id.toString(), newUser.email);

    // Return the new user and token
    return { user: newUser, token };
  },

  login: async (email, password) => {
    if (!(email && password)) {
      throw new Error("Please fill all required areas!");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Your email/password is wrong!");
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error("Your email/password is wrong!");
    }

    const token = auth.generateToken(user._id.toString(), user.email);

    // Return user and token, without the password and version key
    return {
      user: {
        ...user.toObject(),
        password: undefined,
        __v: undefined,
      },
      token,
    };
  },

  getUser: async (id) => {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found!");
    }

    // Return user without the password and version key
    return {
      ...user.toObject(),
      password: undefined,
      __v: undefined,
    };
  },

  getUserWithMail: async (email) => {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("There is no registered user with this e-mail.");
    }

    // Return a Data Transfer Object containing only the necessary user data
    return {
      name: user.name,
      surname: user.surname,
      color: user.color,
      email: user.email,
    };
  },
};

module.exports = userService;
