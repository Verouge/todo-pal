const listService = require("../../services/listService");

const listResolvers = {
  Query: {
    getListsByBoard: async (_, { boardId }) => {
      // Assuming listService.getAll now returns a Promise and does not use a callback
      return await listService.getAll(boardId);
    },
  },
  Mutation: {
    createList: async (_, { title, boardId }, { currentUser }) => {
      // Assuming listService.create now returns a Promise and does not use a callback
      // currentUser is assumed to be injected into context by the auth middleware
      return await listService.create({ title, boardId, user: currentUser });
    },
    deleteList: async (_, { listId }, { currentUser }) => {
      // Assuming listService.deleteById now returns a Promise and does not use a callback
      return await listService.deleteById(listId, currentUser);
    },
    updateListTitle: async (_, { listId, title }, { currentUser }) => {
      // Assuming listService.updateListTitle now returns a Promise and does not use a callback
      return await listService.updateListTitle(listId, title, currentUser);
    },
    // Include additional mutations for card ordering if needed
  },
};

module.exports = listResolvers;
