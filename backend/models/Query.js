
const mongoose = require('mongoose');
const { Schema } = mongoose;


const QuerySchema = Schema({
  message: { type: String, required: true },
  channel: { type: String, default: "email" },
  tags: [String],
  priority: { type: String, default: "low" },
  sentiment: Number,
  status: { type: String, default: "open" },
  assignedTo: { type: String, default: null },
  history: [
    {
      action: String,
      by: String,
      at: { type: Date, default: Date.now }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Query', QuerySchema);