const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const sentimentAnalyze = require('../utils/sentimentsAnalyse');
const autoTag = require('../utils/autoTag');
const autoPriority = require('../utils/autoPriority');
const { model } = require('mongoose');
const {
  createQuery,
  getAllQueries,
  getById,
  updateQuery,
  getAnalytics,
}= require('../controllers/queryController');



// Create a new query
router.route("/").post(createQuery).get(getAllQueries);
// Get, Update query by ID
router.route("/analytics").get(getAnalytics);
router.route("/:id").get(getById).patch(updateQuery);

// Get analytics

module.exports = router;


