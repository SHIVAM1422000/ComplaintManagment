const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

// GET /api/users/:userId/sentiment-trend?days=14
router.get('/user/:userId/sentiment-trend', async (req, res) => {
  try {
    const userId = req.params.userId;
    const days = parseInt(req.query.days || '14', 10);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // aggregate daily average sentiment
    const agg = await Query.aggregate([
      { $match: { userId: userId, createdAt: { $gte: since } } },
      { $project: { day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, sentiment: 1 } },
      { $group: { _id: "$day", avgSentiment: { $avg: "$sentiment" } } },
      { $sort: { _id: 1 } }
    ]);
    res.status(200).json({ ok:true, trend: agg });
  } catch(err){ console.error(err); res.status(500).json({ error: err.message }); }
});


module.exports = router;