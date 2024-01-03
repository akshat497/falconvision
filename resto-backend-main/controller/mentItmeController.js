
const MenuItem = require("../models/menuItem");
const authentication = require('../middlewares/authentication');
const Category = require('../models/category');
const path=require("path")
const WebSocketServer = require('../webSoketConnect');
const CustomErrorHandler = require("../services/CustomErrorHandler");
const CustomResponseHandler = require("../services/CustomResponseHandler");
const User = require("../models/user");
const fs =require("fs")

const deleteImage = async (imagePath) => {
  try {
    await fs.promises.unlink(path.normalize(imagePath));
    console.log('Image deleted successfully');
  } catch (error) {
    console.error(`Error deleting image: ${error}`);
    // Handle error appropriately, such as logging or returning an error response
  }
};

const menuItemController = {
  getMenuItemById: async (req, res, next) => {
    const { userId } = req.params;

    try {
        // Check if the user exists
        const user = await User.findOne({where:{userId:userId}});

        if (!user) {
            return next(CustomErrorHandler.UserNotFound());
        }

        // If user exists, proceed to fetch menu items
        const menuItems = await MenuItem.findAll({
            where: { userId: userId },
            include: {
                model: Category,
                as: 'Category',
            },
        });

        if (menuItems.length < 1) {
            return res.json(CustomResponseHandler.negativeResponse(user.name, 404, []));
        }

        const formattedMenuItems = menuItems.map((menuItem) => {
            const {
                menuItemId,
                price,
                name,
                imageUrl,
                createdAt,
                updatedAt,
                categoryId,
                userId,
                Category,
                isActive,
                veg,
                type,
                description
            } = menuItem;

            const categoryInfo =
                Category && Category.categoryId
                    ? {
                          categoryId: Category.categoryId,
                          name: Category.name,
                          isActive: Category.isActive,
                          createdAt: Category.createdAt,
                          updatedAt: Category.updatedAt,
                          userId: Category.userId,
                      }
                    : { name: "Category Deleted" }; // Use a custom text for deleted category

            return {
                menuItemId,
                price,
                name,
                imageUrl,
                createdAt,
                updatedAt,
                categoryId,
                userId,
                Category: categoryInfo,
                isActive,
                veg,
                type,
                description
            };
        });

        res.json(CustomResponseHandler.positiveResponse(user.name, formattedMenuItems));
    } catch (err) {
        // Handle errors appropriately, e.g., log the error
        console.error(err);

        // Send a negative response directly using res.status and res.json
        return next(err);
    }
},
  updateMenuItem: async (req, res, next) => {
    try {
      const { categoryId, name, imageUrl, price, isActive, userId, menuItemId, veg, type,description } = req.body;
      authentication(req, res, async () => {
        const obj = {
          name: name,
          userId: userId,
          categoryId: categoryId,
          imageUrl:imageUrl,
          price: price,
          isActive: isActive,
          veg: veg,
          type: type,
          description:description
        };
        console.log(obj)
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised())
        }
        // if(req.user.isActive===false){
        //   return res.status(403).json({message:"Your account does't have permission to perform this action"});
        // }
        // Update the menu item in the database
        const existingMenuItem = await MenuItem.findOne({
          where: { menuItemId, userId },
          include: { model: Category, as: 'Category' },
        });
        var newImageUrl = existingMenuItem.imageUrl;
        if (req.file) {
          await deleteImage(existingMenuItem.imageUrl); // Delete the old image
          newImageUrl = req.file.path; // Save the path of the new imag
          obj.imageUrl=newImageUrl
        }
        const [rowCount] = await MenuItem.update(obj, { where: { menuItemId, userId } });
  
        if (rowCount > 0) {
          // Fetch all menu items after the update, including the associated category
          const menuItems = await MenuItem.findAll({
            where: { userId: userId },
            include: {
              model: Category,
              as: 'Category',
            },
          });
         
          const formattedMenuItems = menuItems.map((menuItem) => {
                        const {
                            menuItemId,
                            price,
                            name,
                            imageUrl,
                            createdAt,
                            updatedAt,
                            categoryId,
                            userId,
                            Category,
                            isActive,
                            veg,
                            type,
                            description
                        } = menuItem;
            
                        return {
                            menuItemId,
                            price,
                            name,
                            imageUrl,
                            createdAt,
                            updatedAt,
                            categoryId,
                            userId,
                            description,
                            Category: {
                                categoryId: Category.categoryId,
                                name: Category.name,
                                isActive:Category.isActive,
                                createdAt: Category.createdAt,
                                updatedAt: Category.updatedAt,
                                userId: Category.userId,
                            },
                            isActive,
                            veg,
                            type
                        };
                    });
  
          // WebSocketServer.broadUpdate({updateType:'updatedMenu',data:formattedMenuItems} );
          WebSocketServer.broadUpdate(userId, formattedMenuItems, 'updatedMenu');

          return res.json(CustomResponseHandler.positiveResponse("Menu updated successfully", formattedMenuItems));

        } else {
         return res.json(CustomErrorHandler.NotFound("no record found"));
        }
      });
    } catch (err) {
      return next(err);
    }
  },
  addMenuItem: async (req, res, next) => {
    console.log("file:",req.file)
    try {
      authentication(req, res, async () => {
        
        const { name, imageUrl, price, isActive, userId, categoryId, veg, type,description } = req.body;
       
       
        if (!name || name.length > 30) {
          return res.status(400).json({ message: 'Name is required and should be less than or equal to 30 characters' });
        }
  
        // Validate image URL and type (must be PNG)
        
  
        // Validate description length
        if (!description || description.length > 200) {
          return res.status(400).json({ message: 'Description is required and should be less than or equal to 200 characters' });
        }
  
        // Validate other required fields
        if (!price || !userId || !categoryId || !type ||imageUrl) {
          return res.status(400).json({ message: 'All fields are required' });
        }
  
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised())
        }
        // if(req.user.isActive===false){
        //   return res.status(403).json({message:"Your account does't have permission to perform this action"});
        // }
        // Create a new menu item in the database
       
       if(req.file.size>512000){
        await deleteImage(req.file.path);
        return res.status(500).json({message:"Image size should be under 500kb"})
       }
        const newItem = await MenuItem.create({
          name,
          userId,
          categoryId,
          imageUrl:req.file.path,
          price,
          isActive,
          veg,
          type,
          description
        });
  
        // Fetch the associated category
        const category = await Category.findByPk(categoryId);
     
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
  
        // Prepare the data for broadcasting
        const formattedDoc = {
          id: newItem.id,
          name: newItem.name,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          isActive: newItem.isActive,
          veg: newItem.veg,
          type: newItem.type,
          categoryId: category.id,
          description:newItem.description,
          Category: {
            categoryId: category.id,
            name: category.name,
            isActive:category.isActive,
            userId:category.userId
            // Include other category fields if needed
          },
        };
  
        // Broadcast the newly added menu item to all connected clients using WebSocket
        WebSocketServer.broadUpdate(userId, formattedDoc, 'newMenu');
  
        res.json(CustomResponseHandler.positiveResponse("Menu Item Added Successfully",formattedDoc));
      });
    } catch (err) {
      console.error(err.stack);
      return next(err);
    }
  },
  deleteMenuItem: async (req, res, next) => {
    const { menuItemIds,userId } = req.body;
    try {
    authentication(req,res,async()=>{
      if (req.user.userId !== userId) {
        return next(CustomErrorHandler.UnAuthorised());
      }
      for(const menuItemId of menuItemIds){
        if (!menuItemId || !userId) {
          return next(CustomErrorHandler.MenuItemError("Invalid input!", 400));
        }
  
        const existingMenuItem = await MenuItem.findOne({
          where: { menuItemId: menuItemId, userId: userId },
        });
  
        if (!existingMenuItem) {
          return next(CustomErrorHandler.NotFound('No such Item Found'));
        }
  
        let newImageUrl = existingMenuItem.imageUrl;
       
        await deleteImage(newImageUrl);
        
  
        // Delete the associated menu item from the database
        const response = await MenuItem.destroy({ where: { menuItemId: menuItemId, userId: userId } });
  
        if (response === 0) {
          return next(CustomErrorHandler.NotFound('No such Item Found'));
        }
      }

      WebSocketServer.broadUpdate(userId, menuItemIds, 'deletedMenu');
        res.json(CustomResponseHandler.positiveResponse("Menu Item Deleted Successfully",[]));
    })
    } catch (err) {
      return next(err);
    }
  },
  
};

module.exports = menuItemController;
