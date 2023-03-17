
const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', authMiddleware, logout);


module.exports = router;
