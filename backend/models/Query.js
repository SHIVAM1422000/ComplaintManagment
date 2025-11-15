import mongoose from 'mongoose';
const { Schema } = mongoose;


const HistorySchema = new Schema({
  action: String,
  by: String,
  at: { type: Date, default: Date.now },
  note: String
});

const QuerySchema = new Schema({
  senderName: String,
  senderChannel: { type: String, default: 'website-chat' }, // email|instagram|whatsapp|website-chat
  message: { type: String, required: true },
  tags: [String],
  priority: { type: String, enum: ['low','medium','high'], default: 'low' },
  sentiment: { type: String, enum: ['positive','neutral','negative'], default: 'neutral' },
  status: { type: String, enum: ['open','in-progress','escalated','resolved'], default: 'open' },
  assignedTo: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  history: [HistorySchema]
});

module.exports = mongoose.model('Query', QuerySchema);