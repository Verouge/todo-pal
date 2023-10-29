const List = require("../Models/List");
const Board = require("../Models/Board");
const Card = require("../Models/Card");

const listService = {
  create: async ({ title, boardId, user }) => {
    // Create a new list
    const newList = new List({ title, owner: boardId });
    await newList.save();

    // Add the new list to the board's list array
    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error("Board not found");
    }
    board.lists.push(newList._id);
    await board.save();

    return newList;
  },

  getAll: async (boardId) => {
    // Ensure the board exists
    const board = await Board.findById(boardId);
    if (!board) {
      throw new Error("Board not found");
    }

    // Return lists that belong to the board
    const lists = await List.find({ owner: boardId }).populate("cards");
    return lists;
  },

  deleteById: async (listId, user) => {
    // Retrieve the list to ensure it exists and the user has permission to delete it
    const listToDelete = await List.findById(listId);
    if (!listToDelete) {
      throw new Error("List not found");
    }

    // Permission check: Ensure that the user is the owner of the board the list belongs to
    // This assumes the 'user' parameter contains the authenticated user's data
    const board = await Board.findOne({
      _id: listToDelete.owner,
      "members.user": user._id,
    });
    if (!board) {
      throw new Error("Unauthorized to delete list from this board");
    }

    // Delete the list
    await List.findByIdAndRemove(listId);

    // Remove the list reference from the board
    board.lists.pull(listId);
    await board.save();

    // Also delete all cards associated with this list (if applicable)
    await Card.deleteMany({ owner: listId });

    return { message: "List deleted successfully" };
  },

  updateListTitle: async (listId, title, user) => {
    // Retrieve the list to ensure it exists and the user has permission to update it
    const listToUpdate = await List.findById(listId);
    if (!listToUpdate) {
      throw new Error("List not found");
    }

    // Permission check: Ensure that the user is the owner of the board the list belongs to
    const board = await Board.findOne({
      _id: listToUpdate.owner,
      "members.user": user._id,
    });
    if (!board) {
      throw new Error("Unauthorized to update list in this board");
    }

    // Update the list title
    listToUpdate.title = title;
    await listToUpdate.save();

    return listToUpdate;
  },

  // Additional methods for updating card order, list order, etc. can be added here
};

module.exports = listService;
