const Board = require("./models/Board");

const boardService = {
  getAll: function (userId) {
    return Board.find({ "members.user": userId });
  },

  getById: function (boardId) {
    return Board.findById(boardId);
  },

  getActivityById: function (boardId) {
    // Retrieving the 'activity' field from the Board document
    return Board.findById(boardId).then((board) => board.activity);
  },

  create: function (req) {
    const { title, backgroundImageLink, members } = req.body;
    const userId = req.user._id; // user info in req.user

    // Create and save the board
    return Board.create({ title, backgroundImageLink, members });
  },

  addMember: function (boardId, members) {
    return Board.findByIdAndUpdate(
      boardId,
      { $addToSet: { members: { $each: members } } },
      { new: true }
    );
  },

  updateBoardTitle: function (boardId, title) {
    return Board.findByIdAndUpdate(boardId, { title }, { new: true });
  },

  updateBoardDescription: function (boardId, description) {
    return Board.findByIdAndUpdate(boardId, { description }, { new: true });
  },

  updateBackground: function (boardId, background, isImage) {
    return Board.findByIdAndUpdate(
      boardId,
      { backgroundImageLink: background, isImage },
      { new: true }
    );
  },
};

module.exports = boardService;
