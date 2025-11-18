const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  queryId: { type: Schema.Types.ObjectId, ref: 'Query' },
  sender: String, // agentName or user
  text: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ChatMessage', ChatSchema);
