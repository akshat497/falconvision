const User = require("../models/user"); // Import your User model
const authentication = require("../middlewares/authentication");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const jwt = require("jsonwebtoken");
const WebSocketServer = require("../webSoketConnect");
const QRCode = require("qrcode-generator");
const jwtsecreat = process.env.JWT_SECRET;
const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        if(req.user.role!=="superadmin"){
          return next(CustomErrorHandler.forbiddden())

        }
        const users = await User.findAll();

        if (!users) {
          return res.status(404).json({ message: "No users found" });
        }
        if (req.user.role !== "superadmin") {
          return next(CustomErrorHandler.forbiddden());
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
        res
          .status(401)
          .send({ error: "Please authenticate using a valid token" });
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
        userId: user.userId,

        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        area: user.area,
        zip: user.zip,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        trialExpirationDate:user.trialExpirationDate
      };

      res.json(userDetails);
    } catch (err) {
      return next(err);
    }
  },
  updateUserDetails: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const { name, address, area, zip, userId, isActive, role } = req.body;
  
        if (req.user.role === "superadmin") {
          var obj = {
            name,
            address,
            area,
            zip,
            isActive,
            role,
            isManuallyActivated: true,
          };
        } else if (req.user.role === "franchise") {
          var obj = {
            name,
            address,
            area,
            zip,
          };
        } else {
          // Handle other roles or return an error if needed
          return next(CustomErrorHandler.MenuItemError("Invalid role",404,[]));
        }
  
        // Additional validation for certain fields
        if (req.user.role !== "superadmin" && (isActive || role || obj.isManuallyActivated)) {
          return next(CustomErrorHandler.MenuItemError("Access Denied.",400,[]));
        }
  
        let newUser = await User.update(obj, { where: { userId: userId } });
        if (!newUser) {
          return next(CustomErrorHandler.UserNotFound());
        }
  
        // WebSocketServer.broadUpdate(newUser,"userUpdated")
        WebSocketServer.broadUpdate(userId, newUser, "userUpdated");
        return res.send({ message: `Record has been successfully updated.` });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error(error);
      return next(CustomErrorHandler.InternalServerError());
    }
  },
  
  extendTrial: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const { userId, trialExtensionDays } = req.body;
        
        // hashedPassword = await bcrypt.hash(password, 10);
        if (!Number.isInteger(trialExtensionDays) || trialExtensionDays <= 0) {
          return res.status(400).json({ message: 'Invalid trialExtensionDays value' });
        }
        if (req.user.role !== "superadmin") {
          return next(CustomErrorHandler.forbiddden());
        }
        const user = await User.findByPk(userId);
        if (!user) {
          return next(CustomErrorHandler.userNotFound());
        }
       
        const newTrialExpirationDate = new Date(user.trialExpirationDate);
      newTrialExpirationDate.setDate(newTrialExpirationDate.getDate() + trialExtensionDays);
      await user.update({ trialExpirationDate: newTrialExpirationDate ,isManuallyActivated:false});
        // WebSocketServer.broadUpdate(newUser,"userUpdated")
        WebSocketServer.broadUpdate(userId, user, "userUpdated");
        res.send(`${user.name} record has been successfully updated.`);
      });
    } catch (error) {}
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
        const isPasswordValid = await bcrypt.compare(
          oldPassword,
          user.password
        );

        if (!isPasswordValid) {
          return next(
            CustomErrorHandler.passwordError("Password is not valid ! ")
          );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (password !== confirmPassword) {
          return next(
            CustomErrorHandler.passwordError(
              "Password and confirm password do not match! "
            )
          );
        }

        // Update the user's password in the database
        const updatedUser = await User.update(
          { password: hashedPassword, confirmPassword: hashedPassword },
          { where: { userId: req.user.userId } }
        );

        if (updatedUser) {
          return res
            .status(200)
            .json({ message: "Password reset successfully" });
        } else {
          return res.status(500).json({ message: "Error in updating" });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  qrgeneratorL: (req, res, next) => {
    try {
      const {start,end, userId, URL } = req.body;
      authentication(req, res, async () => {
        const qrCodes = [];
       
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
        for (let tableNumber = start; tableNumber <= end; tableNumber++) {
          const url = `${URL}/${userId}/${tableNumber}`;
          const qr = QRCode(0, "L");
          qr.addData(url);
          qr.make();
          console.log(URL)
          qrCodes.push(qr.createDataURL(4));
        }
        res.json(qrCodes);
      });
    } catch (error) {
      return next(error);
    }

},
// qrgeneratorL:(req,res,next)=>{
//   try {
//     const {tableCount,userId,URL} = req.body
//     authentication(req,res,async()=>{
      
//     const qrCodes = [];
//     if(req.user.userId!==userId){
//       return next(CustomErrorHandler.UnAuthorised());
//     }
//     for (let tableNumber = 1; tableNumber <= tableCount; tableNumber++) {
//       const url = `https://ordermanagementbyfalconvesion.netlify.app/${userId}/${tableNumber}`;
//       const qr = QRCode(0, 'L');
//       qr.addData(url);
//       qr.make();
//       qrCodes.push(qr.createDataURL(4));
//     }
//     res.json(qrCodes);
//     })
//   } catch (error) {
//     return next(error)
//   }
// },


  }


module.exports = userController;
