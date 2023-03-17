const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userController = {};

userController.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please enter all required fields' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Password validation
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

userController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Create a token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret not set' });
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    if (!token) {
      return res.status(500).json({ error: 'Failed to create JWT token' });
    }
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: process.env.EXPIRE_TOKEN,
      secure: process.env.NODE_ENV === 'production',
    });

    // Return the token and user data
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

  userController.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };

  

module.exports = userController;

