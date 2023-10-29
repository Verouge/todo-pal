const cardModel = require("../../models/Card");
const listModel = require("../../models/List");
const boardModel = require("../../models/Board");

// Validates if the user is authorized to interact with the card
const validateCardOwners = async (cardId = null, listId, boardId, userId) => {
  const board = await boardModel.findById(boardId);
  const list = await listModel.findById(listId);
  const card = cardId ? await cardModel.findById(cardId) : null;

  // Check if the user is a member of the board
  if (!board.members.some((member) => member.equals(userId))) {
    return false;
  }

  // If this is not the card creation process, check if the card belongs to the list
  if (card && !list.cards.some((item) => item.equals(cardId))) {
    return false;
  }

  // Check if the list belongs to the board
  if (!board.lists.some((item) => item.equals(listId))) {
    return false;
  }

  return true;
};

// Predefined label colors (could be dynamic if needed)
const labelsSeed = [
  { text: "", color: "#61bd4f", backColor: "#519839", selected: false },
  { text: "", color: "#f2d600", backColor: "#d9b51c", selected: false },
  { text: "", color: "#ff9f1a", backColor: "#cd8313", selected: false },
  { text: "", color: "#eb5a46", backColor: "#b04632", selected: false },
  { text: "", color: "#c377e0", backColor: "#89609e", selected: false },
  { text: "", color: "#0079bf", backColor: "#055a8c", selected: false },
];

// Generates a random hex color, ensuring it's not already in use
const existingColors = new Set(); // Populate with existing colors if needed

const createRandomHexColor = () => {
  let hex;
  do {
    hex =
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "0");
  } while (existingColors.has(hex));
  existingColors.add(hex);
  return hex;
};

module.exports = {
  validateCardOwners,
  labelsSeed,
  createRandomHexColor,
};
