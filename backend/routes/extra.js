const express = require("express");
const router = express.Router();
const Query = require("../models/Query");
const { extractiveSummary } = require("../utils/summarizer");


// 1. Summarize
router.post("/:id/summarize", async (req, res) => {
 try {
   const q = await Query.findById(req.params.id);
   if (!q) return res.status(404).json({ error: "Not found" });
   const summary = await extractiveSummary(q.message, 2);
   q.summary = summary;
   await q.save();
   return res.status(200).json({ ok: true, summary });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: err.message });
 }
});


// 2. Chat Messages
const ChatMessage = require("../models/ChatMessage");
router.post("/:id/chat", async (req, res) => {
 try {
   const { id } = req.params;
   const { sender, text } = req.body;
   const cm = await ChatMessage.create({ queryId: id, sender, text });
   // emit socket event if io present
  //  const io = req.app.get("io");
  //  if (io) io.to(`chat_${id}`).emit("chat:new", cm);
   res.status(200).json({ ok: true, message: cm });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: err.message });
 }
});


router.get("/:id/chat", async (req, res) => {
 try {
   const msgs = await ChatMessage.find({ queryId: req.params.id }).sort({
     createdAt: 1,
   });
   res.status(200).json(msgs);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: err.message });
 }
});


module.exports = router;
