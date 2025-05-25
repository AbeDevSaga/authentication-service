const User = require("../models/user");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
  console.log("token verification")
  const token = req.headers.authorization?.split(' ')[1];
  console.log("token ", token)
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.user = decoded;
    console.log("req.user:", req.user);
    const user = await User.findById(req.user.id).select("-password");
    console.log("user :", user);
    res.status(200).json(user)
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });

    // const user_data = {
    //   _id: user._id,
    //   username: user.username,
    //   email: user.email,
    //   role: user.role,
    // };

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Login failed", details: error });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Registration failed", details: error });
  }
};

module.exports = {
  login,
  register,
  verifyToken,
};
