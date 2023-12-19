const User = require("../../models/user");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const bcrypt = require("bcrypt");
const JwtService = require("../../services/JwtService");
const { sendMessage } = require("fast-two-sms");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Sequelize } = require("sequelize");
var unirest = require("unirest");
const OTP = require("../../models/OTP");
const NodeCache = require("node-cache");
const userCache = new NodeCache();
const { v4: uuidv4 } = require('uuid');
const authentication = require("../../middlewares/authentication");
const otpExpiry = 7 * 60 * 1000; // 7 minutes in milliseconds
const jwt = require('jsonwebtoken');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akshatsaini497@gmail.com",
    pass: "wivohkdnqnizwhrp",
  },
});
const authController = {


  // ...
  
  login: async (req, res, next) => {
    const { email, password } = req.body;
  
    if (email.trim() === "" || password.trim() === "" || !email || !password) {
      return res.status(400).json({ message: "fields missing" });
    }
  
    const cachedUser = userCache.get(email);
  
    if (cachedUser) {
      // If found in the cache, return the cached data
      const { authorization, cachedPassword, exp } = cachedUser;
  
      // Check if the token is expired
      if (Date.now() >= exp * 1000) {
        userCache.del(email); // Remove expired data from the cache
      } else {
        // Check the password
        const match = await bcrypt.compare(password, cachedPassword);
  
        if (match) {
          return res.json({ Authorization: authorization });
        } else {
          // If the password doesn't match, proceed to database lookup
          userCache.del(email); // Remove incorrect data from the cache
        }
      }
    }
  
    let authorization = null;
  
    try {
      let user = await User.findOne({ where: { email: email } });
  
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
  
      // Compare passwords
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }
  
      // Generate token
      authorization = JwtService.sign({
        userId: user.userId,
        role: user.role,
        isActive: user.isActive,
      });
  
      const decodedToken = jwt.decode(authorization, { complete: true });
      const exp = decodedToken.payload.exp;
  
      userCache.set(
        email,
        { authorization, cachedPassword: user.password, exp },
        /* optional TTL in seconds */ 300
      );
  
      res.json({ Authorization: authorization });
    } catch (err) {
      return next(err);
    }
  },
  

  register: async (req, res, next) => {
    const {
      email,
      name,
      password,
      confirmPassword,
      phone,
      address,
      area,
      zip,
      isActive,
      enteredOTP,
      referralCode
    } = req.body;

    let hashedPassword = null;
    if (password !== confirmPassword) {
      return next(
        CustomErrorHandler.passwordError(
          "Password and Confirm Password should be same !"
        )
      );
    }
    const otpData = await OTP.findOne({
      where: {
        phoneNumber: phone,
        email,
      },
    });

    console.log(`Retrieved OTP data ${otpData}`);

    if (
      otpData &&
      enteredOTP === otpData.otp &&
      isOTPValid(otpData.timestamp)
    ) {
      // Check if the email matches the stored data
      if (email === otpData.email) {
        // OTP is valid for both phone and email
        await OTP.destroy({
          where: {
            phoneNumber: phone,
            email,
          },
        });

        // res.status(200).json({ message: "OTP is valid" });
      } else {
        // Email does not match
        return res
          .status(400)
          .json({ message: "Invalid email associated with this OTP" });
      }
    } else {
      // OTP is invalid or expired, or phone number is invalid
      return res
        .status(400)
        .json({ message: "Invalid OTP or phone number or email" });
    }
    // Set isActive to true for new users
    const trialPeriodInDays = 30; // Adjust the trial period as needed
    const trialExpirationDate = new Date();
    trialExpirationDate.setDate(
      trialExpirationDate.getDate() + trialPeriodInDays
    );
    // const trialPeriodInMinutes = 5; // Set the trial period to 5 minutes for testing
    // const trialExpirationDate = new Date();
    // trialExpirationDate.setMinutes(trialExpirationDate.getMinutes() + trialPeriodInMinutes);

    hashedPassword = await bcrypt.hash(password, 10);
    const userObj = {
      email,
      name,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      phone,
      address,
      area,
      zip,
      isActive: true, // Activate the user initially
      trialExpirationDate,
    };
    if (referralCode) {
      try {
        const referredUser = await User.findOne({ where: { referralCode } });
    
        // Check if referredUser is not found
        if (!referredUser) {
          return next(CustomErrorHandler.NotFound("Invalid referral code. Please provide a valid referral code or leave it blank if you don't have one."));

        }
    
        // Increase the trialExpirationDate
        const newTrialExpirationDate = new Date(referredUser.trialExpirationDate);
        newTrialExpirationDate.setDate(newTrialExpirationDate.getDate() + 2);
    
        // Update the trialExpirationDate of the referredUser
        await referredUser.update({ trialExpirationDate: newTrialExpirationDate });
    
        // Continue with the rest of your logic
    
      } catch (error) {
        console.error("Error updating trialExpirationDate:", error);
        return res.status(500).json({message:"Internal server error"})
      }
    }
    
    
    let Authorization = null;
    try {
      let user = await User.create(userObj);
      Authorization = JwtService.sign({
        userId: user.userId,
        role: user.role,
        isActive: isActive,
      });
    } catch (err) {
      return next(err);
    }

    return res.json({ Authorization });
  },

  SendOtp: async (req, res) => {
    const { phoneNumber, email } = req.body;

    try {
      // Validate phoneNumber and email
      if (!phoneNumber || !email) {
        return res
          .status(400)
          .json({ message: "Phone number and email are required" });
      }

      // Validate phone number format (you may customize this based on your requirements)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({ message: "Invalid phone number format" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      const otp = generateOTP(6);

      // Store the OTP securely with an expiration time
      // const otpData = {
      //   otp,
      //   timestamp: Date.now(),
      //   phoneNumber,
      //   email,
      // };
      // otpStore.set(phoneNumber, otpData);
      const otpData = await OTP.create({
        otp,
        phoneNumber,
        email,
        timestamp: Date.now(),
      });

      // Send OTP to email
      await transporter.sendMail({
        from: "akshatsaini497@gmail.com",
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is: ${otp}`,
      });

      // Send OTP via SMS
      sendMessage({
        authorization: process.env.API_KEY, // Replace with your Fast2SMS API key
        message: `Your OTP  is: ${otp}`,
        numbers: [phoneNumber],
      });

      console.log(`OTP sent to ${email} and ${phoneNumber}`);

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  VerifyOtp: async (req, res) => {
    const { phoneNumber, email, enteredOTP } = req.body;

    try {
      // Retrieve the stored OTP data
      const otpData = await OTP.findOne({
        where: {
          phoneNumber,
          email,
        },
      });

      console.log(
        `Retrieved OTP for ${phoneNumber}: ${
          otpData ? otpData.otp : "Not found"
        }`
      );

      if (
        otpData &&
        enteredOTP === otpData.otp &&
        isOTPValid(otpData.timestamp)
      ) {
        // Check if the email matches the stored data
        if (email === otpData.email) {
          // OTP is valid for both phone and email
          await OTP.destroy({
            where: {
              phoneNumber,
              email,
            },
          });

          res.status(200).json({ message: "OTP is valid" });
        } else {
          // Email does not match
          res
            .status(400)
            .json({ message: "Invalid email associated with this OTP" });
        }
      } else {
        // OTP is invalid or expired, or phone number is invalid
        res.status(400).json({ message: "Invalid OTP or phone number" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  forgetPassword: async (req, res, next) => {
    const { url, email, phoneNumber } = req.body;
  
    try {
      // Check for missing fields
      if (!email) {
        return next(CustomErrorHandler.BadRequest("Email is required!"));
      }
  
      // Trim the input values
      const trimmedEmail = email.trim();
      const trimmedPhoneNumber = phoneNumber ? phoneNumber.trim() : null;
  
      // Find the user by email
      const user = await User.findOne({ where: { email: trimmedEmail } });
  
      if (!user) {
        return next(CustomErrorHandler.UserNotFound());
      }
  
      // Generate a random token and set the resetToken and resetTokenExpiration fields
      const token = crypto.randomBytes(20).toString("hex");
      user.resetToken = token;
      user.resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour
  
      // Save the user with updated token and expiration
      await user.save();
  
      const resetUrl = `${url}/${token}`;
  
      // Send email
      if (trimmedEmail) {
        await transporter.sendMail({
          from: "akshatsaini497@gmail.com",
          to: trimmedEmail,
          subject: "Password Reset",
          text: `Click on the following link to reset your password: ${resetUrl}`,
        });
      }
  
      // Send SMS
      if (trimmedPhoneNumber) {
        var smsReq = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
  
        smsReq.headers({
          authorization: process.env.QUICK_SMS_API,
        });
  
        smsReq.form({
          message: `Click on the following link to reset your password: ${resetUrl}`,
          language: "english",
          route: "q",
          numbers: trimmedPhoneNumber,
        });
  
        smsReq.end(function (smsRes) {
          if (smsRes.error) throw new Error(smsRes.error);
  
          console.log(smsRes.body);
        });
      }
  
      return res.json({ message: "Password reset link sent" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  
  

  authresetPassword: async (req, res, next) => {
    const { token, newPassword, confirmPassword } = req.body;

    try {
      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "New password and confirm password do not match" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpiration: { [Sequelize.Op.gt]: new Date() },
        },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Check if new password is different from the old password
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return res.status(400).json({
          message: "New password cannot be same as the old password",
        });
      }

      // Update the user's password (hash the new password)

      user.password = hashedPassword;
      user.confirmPassword = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;

      await user.save();

      return res.json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  
  generateReferCode:async(req,res,next)=>{
    const { userId } = req.params;
    authentication(req,res,async()=>{
       try {
      
  
      // Generate a unique referral code using uuid
      const referralCode = uuidv4();
  
      // Find the user by userId
      const user = await User.findOne({ where: { userId } });
     if(userId!==req.user.userId){
      return next(CustomErrorHandler.UnAuthorised())
     }
      // Update the user's referralCode
      if (user) {
        await user.update({ referralCode });
        console.log('Generated Referral Code:', referralCode);
  
        // Send the referral code as a response
        res.status(200).json({ referralCode });
      } else {
        // Handle the case where the user is not found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      // Handle errors
      next(error);
    }}) 
  }
};

function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  return otp.toString();
}

function isOTPValid(timestamp) {
  return Date.now() - timestamp <= otpExpiry;
}

module.exports = authController;
