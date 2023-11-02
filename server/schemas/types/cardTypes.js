const cardTypes = `
  type Card {
    id: ID!
    title: String!
    description: String
    labels: [Label]
    members: [Member]
    watchers: [Watcher]
    date: CardDate
    attachments: [Attachment]
    activities: [Activity]
    owner: List
    cover: Cover
    checklists: [Checklist]
  }

  type Label {
    id: ID!
    text: String
    color: String
    backColor: String
    selected: Boolean
  }

  type Member {
    id: ID!
    user: User
    name: String
    color: String
  }

  type Watcher {
    id: ID!
    user: User
    name: String
  }

  type CardDate {
    startDate: String
    dueDate: String
    dueTime: String
    reminder: Boolean
    completed: Boolean
  }

  type Attachment {
    id: ID!
    link: String
    name: String
    date: String
  }

  type Activity {
    id: ID!
    userName: String
    text: String
    date: String
    isComment: Boolean
    color: String
  }

  type Cover {
    color: String
    isSizeOne: Boolean
  }

  type Checklist {
    id: ID!
    title: String
    items: [ChecklistItem]
  }

  type ChecklistItem {
    id: ID!
    text: String
    completed: Boolean
  }

  extend type Query {
    card(cardId: ID!): Card
    cardsByList(listId: ID!): [Card]
  }

  extend type Mutation {
    createCard(input: CreateCardInput!): Card
    updateCard(cardId: ID!, input: UpdateCardInput!): Card
    deleteCard(cardId: ID!): DeletePayload
  }

  input CreateCardInput {
    title: String!
    listId: ID!
    description: String
  }

  input UpdateCardInput {
    title: String
    description: String
  }

  type DeletePayload {
    id: ID!
    success: Boolean!
    message: String
  }
`;

module.exports = cardTypes;
