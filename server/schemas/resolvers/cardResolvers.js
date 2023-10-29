const cardService = require("../../services/cardService");

const cardResolvers = {
  Query: {
    card: async (_, { cardId }) => {
      return await cardService.getCard(cardId);
    },
    cardsByList: async (_, { listId }) => {
      return await cardService.getCardsByList(listId);
    },
    // Additional queries can be added here
  },
  Mutation: {
    createCard: async (_, { input }, { currentUser }) => {
      return await cardService.createCard(input, currentUser);
    },
    updateCard: async (_, { cardId, input }, { currentUser }) => {
      return await cardService.updateCard(cardId, input, currentUser);
    },
    deleteCard: async (_, { cardId }, { currentUser }) => {
      return await cardService.deleteCard(cardId, currentUser);
    },
    addCommentToCard: async (_, { cardId, text }, { currentUser }) => {
      return await cardService.addComment(cardId, text, currentUser);
    },
    updateCardComment: async (
      _,
      { cardId, commentId, text },
      { currentUser }
    ) => {
      return await cardService.updateComment(
        cardId,
        commentId,
        text,
        currentUser
      );
    },
    deleteCardComment: async (_, { cardId, commentId }, { currentUser }) => {
      return await cardService.deleteComment(cardId, commentId, currentUser);
    },
    addLabelToCard: async (_, { cardId, label }, { currentUser }) => {
      return await cardService.addLabel(cardId, label, currentUser);
    },
    updateCardLabel: async (
      _,
      { cardId, labelId, update },
      { currentUser }
    ) => {
      return await cardService.updateLabel(
        cardId,
        labelId,
        update,
        currentUser
      );
    },
    deleteCardLabel: async (_, { cardId, labelId }, { currentUser }) => {
      return await cardService.deleteLabel(cardId, labelId, currentUser);
    },
    addMemberToCard: async (_, { cardId, userId }, { currentUser }) => {
      return await cardService.addMemberToCard(cardId, userId, currentUser);
    },
    removeMemberFromCard: async (_, { cardId, userId }, { currentUser }) => {
      return await cardService.removeMemberFromCard(
        cardId,
        userId,
        currentUser
      );
    },
    // Additional mutations can be added here
  },
  Card: {
    owner: async (card) => {
      // Assumes that the List reference is stored directly in the Card document
      return await cardService.getListById(card.owner);
    },
    labels: (card) => {
      // If labels are stored directly on the card document, you can return them as is
      return card.labels;
    },
    members: async (card) => {
      // If members need to be populated or fetched in a special way
      return card.members;
    },
    activities: (card) => {
      // If activities are stored directly on the card document, you can return them as is
      return card.activities;
    },
    // Additional nested resolvers can be added here
  },
  // Additional nested resolvers for other types can be added here
};

module.exports = cardResolvers;
