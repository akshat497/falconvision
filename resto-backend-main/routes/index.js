const express = require('express')
const authController = require('../controller/Auth/authController')
const categoryController = require('../controller/categoryController')
const menuItemController = require('../controller/mentItmeController')
const userController = require('../controller/userController')
const orderController = require('../controller/orders/orderController')
const contactUsController = require('../controller/contactUsData/contactUsController')
const coupenCodeController = require('../controller/coupenCodeController')
const router = express.Router()
const app = express();


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
router.delete("/deleteCategoryById/:categoryId/:userId", categoryController.deleteCategory)

//coupens routes
router.get("/CoupenCodeByUserId/:userId", coupenCodeController.getCoupenCode)
router.put("/updateCoupenCodeById", coupenCodeController.updateCoupenCode)
router.post("/createCoupenCode", coupenCodeController.createCoupenCode)
router.post("/applyCoupenCode", coupenCodeController.applyCoupenCode)
router.delete("/deleteCoupenCodeById/:CoupenCodeId/:userId", coupenCodeController.deleteCoupenCode)

//Menu Items Routes
router.get("/MenuItemsByUserId/:userId", menuItemController.getMenuItemById)
router.put("/updateMenuItemById", menuItemController.updateMenuItem)
router.post("/addMenuItems", menuItemController.addMenuItem)
router.delete("/deleteMenuItemsById/:menuItemId/:userId", menuItemController.deleteMenuItem)
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
//
module.exports = router