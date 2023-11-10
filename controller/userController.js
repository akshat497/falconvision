const User = require('../models/user'); // Import your User model
const authentication = require('../middlewares/authentication');
const bcrypt = require('bcrypt');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const jwt = require("jsonwebtoken");
const WebSocketServer = require('../webSoketConnect');
const QRCode = require('qrcode-generator');
const jwtsecreat = process.env.JWT_SECRET;
const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        // Check if the authenticated user is a "superadmin"
        if (req.user.role !== 'superadmin') {
          // return res.status(403).send('Forbidden: Only superadmins can access this resource');
          return next(CustomErrorHandler.forbiddden());
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
          return next(CustomErrorHandler.UserNotFound());
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
          return next(CustomErrorHandler.forbiddden());

        }
        let newUser=await User.update(obj,{where:{userId:userId}});
        if(!newUser){
          return next(CustomErrorHandler.UserNotFound());
            }
            // WebSocketServer.broadUpdate(newUser,"userUpdated")
            WebSocketServer.broadUpdate(userId, newUser, 'userUpdated');
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
              return next(CustomErrorHandler.UserNotFound());
            }

            // Compare the old password provided with the stored hashed password
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordValid) {
              return next(CustomErrorHandler.passwordError("Password is not valid ! "));
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);

            if (password !== confirmPassword) {
                return next(CustomErrorHandler.passwordError("Password and confirm password do not match! "));
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
},
qrgeneratorL:(req,res,next)=>{
  try {
    const {tableCount,userId,url} = req.body
    authentication(req,res,async()=>{
      
    const qrCodes = [];
    if(req.user.userId!==userId){
      return next(CustomErrorHandler.UnAuthorised());
    }
    for (let tableNumber = 1; tableNumber <= tableCount; tableNumber++) {
      const url = `${url}/${userId}/${tableNumber}`;
      const qr = QRCode(0, 'L');
      qr.addData(url);
      qr.make();
      qrCodes.push(qr.createDataURL(4));
    }
    res.json(qrCodes);
    })
  } catch (error) {
    return next(error)
  }
}
};

module.exports = userController;
