const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "../data/users.json");

const readUsers = () => {
    if (!fs.existsSync(usersPath)) return [];
    const data = fs.readFileSync(usersPath);
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    writeUsers(users);

    const token = generateToken(email);
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
    res.status(201).json({ message: "User created", email });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(email);
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
    res.status(200).json({ message: "Login successful", email });
};

exports.verifyToken = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ email: decoded.email });
    } catch (err) {
        res.status(401).json({ message: "Token expired or invalid" });
    }
};