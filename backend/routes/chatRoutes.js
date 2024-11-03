const express = require("express");
const { getNlpResponse } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/chat
router.post("/", authMiddleware, getNlpResponse);

module.exports = router;
