const Query = require("../models/Query");
const { sentimentAnalyze } = require("../utils/sentimentsAnalyse");
const { autoTag } = require("../utils/autoTag");
const { autoPriority } = require("../utils/autoPriority");
const { findDuplicate } = require("../utils/duplicateDetection");
const { extractiveSummary } = require("../utils/summarizer");

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
    const data = await Query.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const q = await Query.findById(req.params.id);
    res.status(200).json(q);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateQuery = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(assignedTo && { assignedTo }),
        $push: { history: { action: `Updated`, by: "system" } },
      },
      { new: true }
    );
    //  Emit live update
    const io = req.app.get("io");
    io.emit("query-updated", { type: "updated", data: updated });
    io.emit("analytics-updated");

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAnalytics = async (req, res) => {
  // add cosole logs to debug after every step
  try {
    const total = await Query.countDocuments();

    const critical = await Query.countDocuments({ priority: "critical" });
    const high = await Query.countDocuments({ priority: "high" });
    const medium = await Query.countDocuments({ priority: "medium" });
    const low = await Query.countDocuments({ priority: "low" });

    const open = await Query.countDocuments({ status: "open" });
    const closed = await Query.countDocuments({ status: "closed" });

    // SLA: tickets open > 24 hours
    const slaBreach = await Query.countDocuments({
      status: "open",
      createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    // Average sentiment
    const sentimentAgg = await Query.aggregate([
      { $group: { _id: null, avgSentiment: { $avg: "$sentiment" } } },
    ]);

    const avgSentiment = sentimentAgg.length ? sentimentAgg[0].avgSentiment : 0;

    // Most common tags
    const topTags = await Query.aggregate([
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
    console.log(error);

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

module.exports = {
  createQuery,
  getAllQueries,
  getById,
  updateQuery,
  getAnalytics,
  suggestReply,
};
