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

    if (user.role==="fenchise"&&user.isActive===false) {
      return res.status(401).send({ message: "forbidden" });
    }

    req.user = user; // Store user object in req.user
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = authentication;

// const jwt = require("jsonwebtoken");
// const JwtService = require("../services/JwtService");
// const jwtsecreat = "bookingbyrohit";
// const authentication = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     res.status(401).send({ error: "plz authenticate using valid token" });
//   }
//   try {
//     const data = jwt.verify(token,jwtsecreat)
//     req.user = data;
//     next();
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };

// module.exports = authentication;
