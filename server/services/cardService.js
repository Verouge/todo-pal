const Card = require("../Models/Card");
const List = require("../Models/List");
const Board = require("../Models/Board");
const mongoose = require("mongoose");

const cardService = {
  create: async (title, listId, boardId, user) => {
    // Verify the user has permission to add a card to the list and board
    const board = await Board.findById(boardId);
    if (!board.members.some((member) => member.user.equals(user._id))) {
      throw new Error("Not authorized to add cards to this board");
    }

    // Create a new card
    const newCard = new Card({ title, owner: listId });
    await newCard.save();

    // Add the new card to the list's card array
    const list = await List.findById(listId);
    list.cards.push(newCard._id);
    await list.save();

    return newCard;
  },

  deleteById: async (cardId, listId, boardId, user) => {
    // Verify the user has permission to delete the card
    const board = await Board.findById(boardId);
    if (!board.members.some((member) => member.user.equals(user._id))) {
      throw new Error("Not authorized to delete cards from this board");
    }

    // Delete the card
    await Card.findByIdAndRemove(cardId);

    // Remove the card reference from the list
    const list = await List.findById(listId);
    list.cards.pull(cardId);
    await list.save();

    return { message: "Card deleted successfully" };
  },

  addComment: async (cardId, userId, text) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    card.activities.push({
      userName: userId, // Ideally, use user name from user model
      text: text,
      date: new Date(),
      isComment: true,
      // color: user.color, // Add color if applicable
    });
    await card.save();
    return card;
  },

  updateComment: async (cardId, commentId, userId, text) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    const comment = card.activities.id(commentId);
    if (!comment) throw new Error("Comment not found");
    // Additional checks to ensure the user owns the comment can go here
    comment.text = text;
    await card.save();
    return card;
  },

  deleteComment: async (cardId, commentId, userId) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    const comment = card.activities.id(commentId);
    if (!comment) throw new Error("Comment not found");
    // Additional checks to ensure the user owns the comment can go here
    comment.remove();
    await card.save();
    return card;
  },

  addLabel: async (cardId, label) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    card.labels.push(label);
    await card.save();
    return card;
  },

  updateLabel: async (cardId, labelId, update) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    const label = card.labels.id(labelId);
    if (!label) throw new Error("Label not found");
    Object.assign(label, update);
    await card.save();
    return card;
  },

  deleteLabel: async (cardId, labelId) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    const label = card.labels.id(labelId);
    if (!label) throw new Error("Label not found");
    label.remove();
    await card.save();
    return card;
  },

  addMemberToCard: async (cardId, userId) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    // Logic to add a user as a member to the card...
    card.members.push(userId); // Assuming members is an array of user IDs
    await card.save();
    return card;
  },

  removeMemberFromCard: async (cardId, userId) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    // Logic to remove a user as a member from the card...
    card.members.pull(userId); // Assuming members is an array of user IDs
    await card.save();
    return card;
  },

  createChecklist: async (cardId, checklist) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    card.checklists.push(checklist);
    await card.save();
    return card;
  },

  updateChecklist: async (cardId, checklistId, update) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    const checklist = card.checklists.id(checklistId);
    if (!checklist) throw new Error("Checklist not found");
    Object.assign(checklist, update);
    await card.save();
    return card;
  },

  deleteChecklist: async (cardId, checklistId) => {
    const card = await Card.findById(cardId);
    // Check if card exists and user has permission...
    const checklist = card.checklists.id(checklistId);
    if (!checklist) throw new Error("Checklist not found");
    checklist.remove();
    await card.save();
    return card;
  },

  // Additional methods can be implemented in a similar pattern...
};

module.exports = cardService;
