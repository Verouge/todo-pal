const userTypes = `
  type User {
    id: ID!
    name: String!
    surname: String!
    email: String!
    avatar: String
    color: String
    boards: [Board!]!
  }

  extend type Query {
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
  }

  extend type Mutation {
    registerUser(input: RegisterInput!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
  }

  input RegisterInput {
    name: String!
    surname: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User
    token: String!
  }
`;

module.exports = userTypes;
