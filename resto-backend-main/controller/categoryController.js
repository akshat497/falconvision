const authentication = require("../middlewares/authentication");
const Category = require("../models/category");
const MenuItem = require("../models/menuItem");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const CustomResponseHandler = require("../services/CustomResponseHandler");
const WebSocketServer = require("../webSoketConnect");
const categoryController = {
  getAllCategoryByUserId: async (req, res, next) => {
    const { userId } = req.params;

    try {
      let resposne = await Category.findAll({ where: { userId: userId } });
      res.json(resposne);
    } catch (err) {
      return next(err);
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const { categoryId, name, userId, isActive } = req.body;
  
      // Validate required fields
      if (!categoryId || !name || !userId) {
        return res.status(400).json(CustomResponseHandler.negativeResponse("categoryId, name, and userId are required", 400));
      }
  
      // Check if the requesting user has the authority to update the category
      authentication(req, res, async () => {
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
  
        // Check if the category exists
        const existingCategory = await Category.findOne({
          where: { categoryId, userId },
        });
  
        if (!existingCategory) {
          return res.status(404).json(CustomResponseHandler.negativeResponse("Category not found", 404));
        }
  
        // Check if a category with the same name already exists for the user (excluding the current category)
        const categoryWithSameName = await Category.findOne({
          where: { name },
        });
  
       
  
        // Update the category
        const updatedCategory = await Category.update(
          { name, userId, isActive },
          { where: { categoryId } }
        );
  
        // Optionally, broadcast the updated category using WebSocket
        WebSocketServer.broadUpdate(userId, updatedCategory, "updatedCategory");
  
        // Send the updated category in the response
        res.json(CustomResponseHandler.positiveResponse("Category updated successfully", updatedCategory));
      });
    } catch (err) {
      // Handle errors appropriately, e.g., log the error
      console.error(err);
  
      // Send a negative response directly using res.status and res.json
      return res.status(500).json(CustomResponseHandler.negativeResponse("Internal Server Error", 500));
    }
  },
  
  addCategory: async (req, res, next) => {
    try {
      const { name, userId, isActive } = req.body;
  
      // Validate required fields
      if (!name || !userId) {
        return res.status(400).json(CustomResponseHandler.negativeResponse("Name and userId are required", 400));
      }
  
      // Check if the requesting user has the authority to add a category
      authentication(req, res, async () => {
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
  
        // Check if the category name is already taken for the user
        const existingCategory = await Category.findOne({
          where: { name, userId },
        });
  
        if (existingCategory) {
          return res.status(409).json(CustomResponseHandler.negativeResponse("Category with the same name already exists for the user", 409));
        }
  
        // Create the category
        const createdCategory = await Category.create({
          name,
          userId,
          isActive,
        });
  
        // Optionally, broadcast the new category using WebSocket
        WebSocketServer.broadUpdate(userId, createdCategory, "newCategory");
  
        // Send the created category in the response
        res.json(CustomResponseHandler.positiveResponse("Category added successfully", createdCategory));
      });
    } catch (err) {
      // Handle errors appropriately, e.g., log the error
      console.error(err);
  
      // Send a negative response directly using res.status and res.json
      return res.status(500).json(CustomResponseHandler.negativeResponse("Internal Server Error", 500));
    }
  },
  
  deleteCategory: async (req, res, next) => {
    const { categoryId, userId } = req.params;
  
    try {
      authentication(req, res, async () => {
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
  
        // Validate if the category exists
        const categoryToDelete = await Category.findOne({
          where: { categoryId, userId },
        });
  
        if (!categoryToDelete) {
          return res.status(404).json(CustomResponseHandler.negativeResponse("Category not found", 404));
        }
  
        // Find all menu items with the specified categoryId
        const menuItemsToDelete = await MenuItem.findAll({
          where: { categoryId, userId },
        });
  
        
  
        // Delete each menu item
        await Promise.all(
          menuItemsToDelete.map(async (menuItem) => {
            await menuItem.destroy();
            // Optionally, you can broadcast the menu item deletion using WebSocket
            WebSocketServer.broadUpdate(userId, menuItem.menuItemId, "deleteMenuItem");
          })
        );
  
        // Now, delete the category
        await Category.destroy({
          where: { categoryId, userId },
        });
  
        // Optionally, broadcast the category deletion using WebSocket
        WebSocketServer.broadUpdate(userId, categoryId, "deleteCategory");
  
        res.json(CustomResponseHandler.positiveResponse("Category and associated menu items deleted successfully"));
      });
    } catch (err) {
      // Handle errors appropriately, e.g., log the error
      console.error(err);
  
      // Send a negative response directly using res.status and res.json
      return res.status(500).json(CustomResponseHandler.negativeResponse("Internal Server Error", 500));
    }
  },
  
  
};
module.exports = categoryController;
