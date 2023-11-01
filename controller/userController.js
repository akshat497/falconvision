const User = require('../models/User'); // Import your User model
const authentication = require('../middlewares/authentication');
const bcrypt = require('bcrypt');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const jwt = require("jsonwebtoken");
const WebSocketServer = require('../webSoketConnect');
const jwtsecreat = process.env.JWT_SECRET;
const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        // Check if the authenticated user is a "superadmin"
        if (req.user.role !== 'superadmin') {
          return res.status(403).send('Forbidden: Only superadmins can access this resource');
        }

        // Fetch all users
        const users = await User.findAll();

        if (!users) {
          return res.status(404).json({ message: 'No users found' });
        }

        // Return the list of users
        res.status(200).json(users);
      });
    } catch (error) {
      next(error);
    }
  },
  getUserDetails: async (req, res, next) => {
    try {
     
        // Assuming that req.user contains the authenticated user's information
        const token = req.header("Authorization");
        if (!token) {
          res.status(401).send({ error: "Please authenticate using a valid token" });
          return;
        }
        const data = jwt.verify(token, jwtsecreat);
        const user = await User.findOne({
          where: { userId: data.userId },
        });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const userDetails = {
          userId:user.userId,
         
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          area: user.area,
          zip: user.zip,
          role: user.role,
          isActive:user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        res.json(userDetails);
     
    } catch (err) {
      return next(err);
    }
  },
  updateUserDetails:async (req,res,next)=>{

    try {
        authentication(req,res,async()=>{
            const {Name,address,area,zip,userId,isActive,role}=req.body;

            // hashedPassword = await bcrypt.hash(password, 10);
        var obj={
           Name,address,area,zip,isActive,role
        };
        if(req.user.role!=="superadmin"){
          return res.status(403).send("forbidden")

        }
        let newUser=await User.update(obj,{where:{userId:userId}});
        if(!newUser){
            return res.status(500).send("Error in updating");
            }
            WebSocketServer.broadUpdate(newUser,"userUpdated")
            res.send(`${newUser} record has been successfully updated.`);
        })

    } catch (error) {
        
    }
  },
  resetPassword: async (req, res, next) => {
    try {
        authentication(req, res, async () => {
            const { oldPassword, password, confirmPassword } = req.body;

            // Fetch the user's information, including the hashed password
            const user = await User.findOne({ where: { userId: req.user.userId } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the old password provided with the stored hashed password
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordValid) {
                return res.status(422).json({ message: 'Invalid password' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Password and confirm password do not match' });
            }

            // Update the user's password in the database
            const updatedUser = await User.update(
                { password: hashedPassword, confirmPassword:hashedPassword},
                { where: { userId: req.user.userId } }
            );

            if (updatedUser) {
                return res.status(200).json({ message: 'Password reset successfully' });
            } else {
                return res.status(500).json({ message: 'Error in updating' });
            }
        });
    } catch (error) {
        next(error);
    }
}

};

module.exports = userController;
