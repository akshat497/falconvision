const jwt = require("jsonwebtoken");
const jwtsecreat = process.env.JWT_SECRET;
const User = require("../models/user"); // Replace with the actual path to your user model
const authentication = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
    return;
  }

  try {
    const data = jwt.verify(token, jwtsecreat);

    // Fetch user information based on data from the token
    const user = await User.findOne({ where: { userId: data.userId } });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    if (user.role === "superadmin") {
      // Super admins can bypass all security checks, so they can proceed
      req.user = user; // Store user object in req.user
      return next();
    }    
    if (new Date(user.trialExpirationDate) < new Date()) {
      // If the trial period has ended, deactivate the user
      user.isActive = false;
      await user.save();
      return res.status(401).json({ message: "Membership is expired. Contact support to continue." });
    
  }
    
    if (user.isActive===false) {
      return res.status(401).send({ message: "forbidden" });
    }
   

    req.user = user; // Store user object in req.user
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = authentication;


