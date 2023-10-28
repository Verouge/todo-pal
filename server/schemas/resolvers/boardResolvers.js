const boardServices = require("../../services/boardServices");

const boardResolvers = {
  Query: {
    getAllBoards: async (parent, args, context) => {
      return boardServices.getAllBoards();
    },
    getBoardById: async (parent, { boardId }, context) => {
      return boardServices.getBoardById(boardId);
    },
  },
  Mutation: {
    createBoard: async (parent, { input }, context) => {
      return boardServices.createBoard(input);
    },
  },
};

module.exports = boardResolvers;
