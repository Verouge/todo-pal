const { gql } = require("@apollo/server");

const listTypes = gql`
  type List {
    id: ID!
    title: String!
    cards: [Card!]!
    owner: Board!
  }

  extend type Query {
    getListsByBoard(boardId: ID!): [List!]!
  }

  extend type Mutation {
    createList(title: String!, boardId: ID!): List!
    deleteList(listId: ID!): ResponseMessage!
    updateListTitle(listId: ID!, title: String!): ResponseMessage!
  }

  type ResponseMessage {
    message: String!
  }
`;

module.exports = listTypes;
