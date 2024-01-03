const express = require('express')
const authController = require('../controller/Auth/authController')
const categoryController = require('../controller/categoryController')
const menuItemController = require('../controller/mentItmeController')
const userController = require('../controller/userController')
const orderController = require('../controller/orders/orderController')
const contactUsController = require('../controller/contactUsData/contactUsController')
const coupenCodeController = require('../controller/coupenCodeController')
const authentication = require('../middlewares/authentication')
const router = express.Router()
const multer = require('multer');
const fs =require("fs")
const crypto=require("crypto")
const path=require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.body.userId; // Assuming you have user information in the request
      const userUploadsPath = `./uploads/${userId}`;
  
      // Ensure the directory exists or create it
      fs.mkdir(userUploadsPath, { recursive: true }, (err) => {
        if (err) {
          return cb(err, null);
        }
        cb(null, userUploadsPath);
      });
    },
    filename: (req, file, cb) => {
      // Generate a unique filename
      const uniqueFilename = crypto.randomBytes(16).toString('hex') + '-' + Date.now() + path.extname(file.originalname);
      cb(null, uniqueFilename);
    },
  });
  const upload = multer({ 
    storage: storage,
   
  })




//expiration check
router.get("/check-expire", authentication)
//Auth Routes
router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/otp", authController.SendOtp)
router.post("/verifyotp", authController.VerifyOtp)
router.post("/forgetpassword", authController.forgetPassword)
router.post("/authresetpassword", authController.authresetPassword)
router.get("/generaterefercode/:userId", authController.generateReferCode)

//user routes
router.get("/getUserDetails",userController.getUserDetails )
router.get("/getAllUserDetails",userController.getAllUsers )
router.put("/updateUserDetails",userController.updateUserDetails )
router.delete("/deleteUserDetails",userController.getUserDetails )
router.post("/qrgenerator",userController.qrgeneratorL )
router.put("/extendTrial",userController.extendTrial )


//category Routes
router.get("/categoryByUserId/:userId", categoryController.getAllCategoryByUserId)
router.put("/updateCategoryById", categoryController.updateCategory)
router.post("/addCategory", categoryController.addCategory)
router.post("/deleteCategoryById", categoryController.deleteCategory)
// router.post("/deleteAllCategories", categoryController.deleteAllCategories)


//coupens routes
router.get("/CoupenCodeByUserId/:userId", coupenCodeController.getCoupenCode)
router.put("/updateCoupenCodeById", coupenCodeController.updateCoupenCode)
router.post("/createCoupenCode", coupenCodeController.createCoupenCode)
router.post("/applyCoupenCode", coupenCodeController.applyCoupenCode)
router.post("/deleteCoupenCodeByIds", coupenCodeController.deleteCoupenCode)

//Menu Items Routes
router.get("/MenuItemsByUserId/:userId", menuItemController.getMenuItemById)
router.put("/updateMenuItemById",  upload.single('imageUrl'),menuItemController.updateMenuItem)
router.post("/addMenuItems", upload.single('imageUrl'),menuItemController.addMenuItem)
router.post("/deleteMenuItemsByIds", menuItemController.deleteMenuItem)
//password reset routes
router.post("/resetpassword", userController.resetPassword)
//Order Routes
router.get("/getOrder/:userId", orderController.getOrderByUserId)
router.post("/getSalesSummary/:userId", orderController.getSalesSummary)
router.put("/updateIsActiveOfOrder", orderController.updateOrder)
router.post("/addOrders", orderController.createOrder)
router.delete("/deleteOrdersById/:orderId", orderController.deleteOrder)
//contact us routes
router.get("/getcontactus", contactUsController.getContactUs)
router.post("/createcontactus", contactUsController.createContactUs)
router.post("/deletecontactus", contactUsController.deleteContactUsById)
//
module.exports = router