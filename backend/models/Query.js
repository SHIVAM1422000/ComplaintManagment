const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuerySchema = Schema(
  {
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
        at: { type: Date, default: Date.now },
      },
    ],
    duplicateOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Query",
      default: null,
    },
    summary: { type: String, default: "" },
    userId: { type: String, default: null },
    embedding: { type: [Number], default: [] },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Query", QuerySchema);
