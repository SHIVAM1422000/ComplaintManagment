const express = require("express");
const router = express.Router();
const Query = require("../models/Query");
const sentimentAnalyze = require("../utils/sentimentsAnalyse");
const autoTag = require("../utils/autoTag");
const autoPriority = require("../utils/autoPriority");
const { model } = require("mongoose");
const { protect } = require("../middleware/authmiddleware");
const roles = require("../middleware/rolesMiddleware");
const tenant = require("../middleware/tenantMiddleware");
const {
  createQuery,
  getAllQueries,
  getById,
  updateQuery,
  getAnalytics,
  suggestReply,
  addChatMessage,
  getChats,
} = require("../controllers/queryController");

// Create a new query
router
  .route("/")
  .post(tenant, protect, roles(["user", "agent", "admin"]), createQuery);
router
  .route("/")
  .get(tenant, protect, roles(["admin", "agent"]), getAllQueries);
// Get, Update query by ID
router.route("/analytics").get(getAnalytics);
router
  .route("/:id")
  .get(tenant, protect, roles(["user", "agent", "admin"]), getById);
router
  .route("/:id")
  .patch(tenant, protect, roles(["agent", "admin"]), updateQuery);
router.route("/:id/suggest-reply").get(suggestReply);
router
  .route("/:id/chat")
  .post(tenant, protect, roles(["user", "agent", "admin"]), addChatMessage)
  .get(tenant, protect, roles(["user", "agent", "admin"]), getChats);

// router
//   .route("/:id")
//   .delete(protect, roles(["admin"]), deleteQuery);

module.exports = router;

// router.delete('/:id', protect, roles('admin'), queryController.deleteQuery);
// router.patch('/:id/assign', protect,roles(['admin','agent']) ), queryController.assignQuery);
