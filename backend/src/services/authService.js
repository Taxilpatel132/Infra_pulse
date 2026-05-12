const User = require('../models/User');
const { hashPassword, verifyPassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

const registerUser = async (userData) => {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate token
    const token = generateToken(savedUser._id);

    return { 
        user: { id: savedUser._id, username: savedUser.username, email: savedUser.email }, 
        token 
    };
};

const loginUser = async (email, password) => {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Verify password
    const isMatch = await verifyPassword(user.password, password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user._id);

    return { 
        user: { id: user._id, username: user.username, email: user.email }, 
        token 
    };
};

module.exports = { registerUser, loginUser };