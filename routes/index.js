const express = require('express')
const authController = require('../controller/Auth/authController')
const categoryController = require('../controller/categoryController')
const menuItemController = require('../controller/mentItmeController')
const router = express.Router()

//Auth Routes
router.post("/register", authController.register)
router.post("/login", authController.login)

//category Routes
router.get("/category", categoryController.getAllCategoryByUserId)
router.put("/category", categoryController.updateCategory)
router.post("/category", categoryController.addCategory)
router.delete("/category", categoryController.deleteCategory)

//Menu Items Routes
router.get("/menuItems", menuItemController.getAllMenuItemsByUserId)
router.put("/menuItems", menuItemController.updateMenuItem)
router.post("/menuItems", menuItemController.addMenuItem)
router.delete("/menuItems", menuItemController.deleteMenuItem)


module.exports = router