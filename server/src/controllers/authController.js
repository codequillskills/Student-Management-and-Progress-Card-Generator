const userModel = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Function
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(401).json({ success: false, message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hashSync(password, 10);
        const newUser = new userModel({
            name, email, password: hashPassword, role
        });
        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully", newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error);
    }
};

// Login Function with JWT Token
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }

        // Create JWT Token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(error);
    }
};

// Logout Function
const logout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "Logout Successful" });
        // To fully logout, the client must remove the token from localStorage/cookies on their side.
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { register, login, logout };