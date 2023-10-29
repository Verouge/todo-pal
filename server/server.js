const dotenv = require("dotenv");
const { ApolloServer } = require("@apollo/server");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schemas");
const { verifyToken } = require("./utils/auth"); // Adjust the path as needed

dotenv.config();

// APOLLO SERVER SETUP
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Try to retrieve a user with the token
    const token = req.headers.authorization || "";
    const user = token ? await verifyToken(token) : null;

    // Add the user to the context
    return { user };
  },
  // ... other configurations
});

// MONGODB CONNECTION
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection is successful!"))
  .catch((err) => {
    console.error("Database connection failed!", err);
  });

// START APOLLO SERVER
server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Apollo Server ready at ${url}`);
});
