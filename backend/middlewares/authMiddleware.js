const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error('Authentification échouée');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error('Authentification échouée');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentification échouée' });
  }
};

module.exports = authMiddleware;
