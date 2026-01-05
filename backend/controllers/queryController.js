const Query = require("../models/Query");
const { sentimentAnalyze } = require("../utils/sentimentsAnalyse");
const { autoTag } = require("../utils/autoTag");
const { autoPriority } = require("../utils/autoPriority");
const { findDuplicate } = require("../utils/duplicateDetection");
const { extractiveSummary } = require("../utils/summarizer");
const { get } = require("mongoose");
const { getSocket } = require("../socket/socket");

const createQuery = async (req, res) => {
  try {
    const { message, channel } = req.body;
    // check if duplicate messge  exists
    const all = await Query.find({}).select("message"); // small scale OK
    const dup = await findDuplicate(message, all, 0.75);
    // ADD SUMMARY
    const summary = await extractiveSummary(message, 2);
    // console.log("Message:", message, "Channel:", channel);
    const tags = autoTag(message);
    // console.log("Generated Tags:", tags);
    const sentiment = sentimentAnalyze(message);
    // console.log("Analyzed Sentiment:", sentiment);
    const priority = autoPriority(tags, sentiment);
    // console.log("Determined Priority:", priority);

    const query = await Query.create({
      message,
      channel,
      tags,
      sentiment,
      priority,
      summary,
      duplicateOf: dup ? dup._id : null,
      company: req.company._id || null,
    });

    // Emit real-time event
    const io = req.app.get("io");
    io.emit("query-updated", { type: "created", data: query });
    io.emit("analytics-updated");

    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getAllQueries = async (req, res) => {
  try {
    const data = await Query.find({ company: req.company._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const q = await Query.findOne({
      _id: req.params.id,
      company: req.company._id,
    });
    res.status(200).json(q);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateQuery = async (req, res) => {
  try {
    const { status, assignedTo, userName } = req.body;
    const updateObject = {
      ...(status && { status }),
      ...(assignedTo && { assignedTo }),
      $push: { history: { action: `Updated`, by: userName } },
    };
    const updated = await Query.findOneAndUpdate(
      { _id: req.params.id, company: req.company._id },
      updateObject,
      { new: true }
    );
    // console.log("Update success: " , updateObject);

    //  Emit live update
    const io = req.app.get("io");
    io.emit("query-updated", { type: "updated", data: updated, by: userName });
    io.emit("analytics-updated");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const deleteQuery = async (req, res) => {
  try {
    const del = await Query.findOneAndDelete({
      _id: req.params.id,
      company: req.company._id,
    });
    res.status(200).json(del);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAnalytics = async (req, res) => {
  try {
    // Total tickets
    const total = await Query.countDocuments({
      company: req.company._id,
    });

    // Priority counts
    const critical = await Query.countDocuments({
      priority: "critical",
      company: req.company._id,
    });

    const high = await Query.countDocuments({
      priority: "high",
      company: req.company._id,
    });

    const medium = await Query.countDocuments({
      priority: "medium",
      company: req.company._id,
    });

    const low = await Query.countDocuments({
      priority: "low",
      company: req.company._id,
    });

    // Status counts
    const open = await Query.countDocuments({
      status: "open",
      company: req.company._id,
    });

    const closed = await Query.countDocuments({
      status: "closed",
      company: req.company._id,
    });

    // SLA breach: open > 24 hours
    const slaBreach = await Query.countDocuments({
      status: "open",
      company: req.company._id,
      createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    // Average sentiment
    const sentimentAgg = await Query.aggregate([
      { $match: { company: req.company._id } },
      { $group: { _id: null, avgSentiment: { $avg: "$sentiment" } } },
    ]);

    const avgSentiment = sentimentAgg.length ? sentimentAgg[0].avgSentiment : 0;

    // Top tags
    const topTags = await Query.aggregate([
      { $match: { company: req.company._id } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      total,
      priorities: { critical, high, medium, low },
      status: { open, closed },
      slaBreach,
      avgSentiment,
      topTags,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const suggestReply = async (req, res) => {
  try {
    const { id } = req.params;
    const q = await Query.findById(id);
    if (!q) return res.status(404).json({ error: "Not found" });

    // Simple template-based suggestion using tags and sentiment
    const tags = q.tags || [];
    const sentiment = q.sentiment || 0;
    let base = "Hi, thanks for reaching out. ";

    if (
      tags.includes("payment") ||
      tags.includes("payment-failed") ||
      tags.includes("refund")
    ) {
      base +=
        "We're sorry about the payment issue. Please share your order id and a screenshot of the transaction so we can investigate and help with a refund or retry.";
    } else if (
      tags.includes("delivery") ||
      tags.includes("tracking") ||
      tags.includes("lost-package")
    ) {
      base +=
        "We apologise for the delivery trouble. Could you confirm your order ID and preferred contact number? We'll locate your shipment and update you immediately.";
    } else if (
      tags.includes("login") ||
      tags.includes("account-locked") ||
      tags.includes("password-reset")
    ) {
      base +=
        "Please try resetting your password with the 'Forgot password' link; if still blocked, share the registered email and we'll escalate to the account team.";
    } else if (sentiment <= -6) {
      base +=
        "We understand your frustration and will escalate this as a priority. Please share the details and we will get back in under 1 business hour.";
    } else {
      base +=
        "Thanks for your message — can you provide a bit more detail so we can help?";
    }

    return res.status(200).json({ text: base });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const getChats = async (req, res) => {
  try {
    const { id } = req.params;
    const q = await Query.findById(id);
    if (!q) return res.status(404).json({ error: "Query not found" });
    res.status(200).json(q.chat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const addChatMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, message } = req.body;

    const q = await Query.findById(id);
    if (!q) return res.status(404).json({ error: "Query not found" });

    const chatEntry = { sender, message };
    q.chat.push(chatEntry);
    await q.save();

    // 🔥 Emit real-time update
    const io = getSocket()
    console.log("🔥 EMITTING chat:new to", `query:${id}`, chatEntry);
    io.to(`query:${id}`).emit("chat:new", chatEntry);

    res.status(200).json(chatEntry);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createQuery,
  getAllQueries,
  getById,
  updateQuery,
  getAnalytics,
  deleteQuery,
  suggestReply,
  getChats,
  addChatMessage,
};
