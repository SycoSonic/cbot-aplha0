const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chat', chatController.getChat);
router.post('/chat', chatController.postChat);

module.exports = router;
