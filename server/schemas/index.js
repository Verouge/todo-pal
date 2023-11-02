const { gql } = require("@apollo/server");
const { merge } = require("lodash");

// Import type definitions
const boardTypes = require("./types/boardTypes");
const cardTypes = require("./types/cardTypes");
const listTypes = require("./types/listTypes");
const userTypes = require("./types/userTypes");

// Import resolvers
const boardResolvers = require("./resolvers/boardResolvers");
const cardResolvers = require("./resolvers/cardResolvers");
const listResolvers = require("./resolvers/listResolvers");
const userResolvers = require("./resolvers/userResolvers");

const rootTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

// Merge all of the resolver objects
const resolvers = merge(
  {},
  boardResolvers,
  cardResolvers,
  listResolvers,
  userResolvers
);

// Combine all type definitions into an array
const typeDefs = [rootTypeDefs, boardTypes, cardTypes, listTypes, userTypes];

module.exports = {
  typeDefs,
  resolvers,
};
