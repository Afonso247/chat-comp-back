const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  prompt: String,
  chosenResponseType: String, // 'base' ou 'ana'
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', voteSchema);