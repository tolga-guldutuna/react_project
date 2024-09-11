const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const chatController = require('../controllers/chatController');

// Oda ID'sini kaydetmek için rota
router.post('/webrtc/sessions/saveRoomId', sessionController.saveRoomId);

// Sohbet mesajını kaydetmek için rota
router.post('/webrtc/chats/start', chatController.saveChatMessage);

module.exports = router;
