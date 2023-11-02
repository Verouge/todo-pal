const boardTypes = `
  type Board {
    id: ID!
    title: String!
    isImage: Boolean!
    backgroundImageLink: String!
    activity: [Activity!]!
    members: [Member!]!
    lists: [List!]!
    description: String!
    createdAt: String!
    updatedAt: String!
  }

  type Activity {
    user: User!
    name: String!
    action: String!
    date: String!
    edited: Boolean!
    cardTitle: String
    actionType: ActionType!
    color: String!
  }

  enum ActionType {
    ACTION
    ANOTHER_TYPE
  }

  type Member {
    user: User!
    name: String!
    surname: String!
    email: String!
    role: MemberRole!
    color: String!
  }

  enum MemberRole {
    MEMBER
  }

  extend type Query {
    getBoardById(boardId: ID!): Board!
    getAllBoards: [Board!]!
  }

  extend type Mutation {
    createBoard(input: CreateBoardInput!): Board!
  }

  input CreateBoardInput {
    title: String!
    isImage: Boolean!
    backgroundImageLink: String!
    activity: [ActivityInput!]!
    members: [MemberInput!]!
    lists: [ID!]!
    description: String!
  }

  input ActivityInput {
    user: ID!
    name: String!
    action: String!
    date: String!
    edited: Boolean!
    cardTitle: String
    actionType: ActionType!
    color: String!
  }

  input MemberInput {
    user: ID!
    name: String!
    surname: String!
    email: String!
    role: MemberRole!
    color: String!
  }
`;

module.exports = boardTypes;
