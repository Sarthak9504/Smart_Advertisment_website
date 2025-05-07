const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { rtdb } = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

const generateToken = (email, uuid) => {
    return jwt.sign({ email, uuid }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const userRef = rtdb.ref("Users");

    try {
        const snapshot = await userRef.once("value");
        const users = snapshot.val() || {};

        // Check if email already exists
        const emailExists = Object.values(users).some(
            (user) => user.credentials && user.credentials.email === email
        );

        if (emailExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const uuid = uuidv4(); // generate unique ID

        const newUserData = {
            credentials: {
                email,
                password: hashedPassword,
            },
            CartItems: {},
            Address: {},
        };

        await userRef.child(uuid).set(newUserData);

        const token = generateToken(email, uuid);
        res.cookie("token", token, { httpOnly: true, sameSite: "Lax", maxAge: Number(process.env.COOKIE_EXPIRY) });
        res.status(201).json({ message: "User created", email });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    const userRef = rtdb.ref("Users");

    try {
        const snapshot = await userRef.once("value");
        const users = snapshot.val() || {};

        const userEntry = Object.entries(users).find(
            ([_, user]) => user.credentials?.email === email
        );

        if (!userEntry) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const [userId, userData] = userEntry;
        const match = await bcrypt.compare(password, userData.credentials.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(email, userId);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Lax", maxAge: Number(process.env.COOKIE_EXPIRY) });
        res.status(200).json({ message: "Login successful", email });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login error", error: error.message });
    }
};



exports.verifyToken = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ email: decoded.email });
    } catch (err) {
        res.status(401).json({ message: "Token expired or invalid" });
    }
};
