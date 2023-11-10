// const MenuItem = require("../models/menuItem");


// const authentication = require('../middlewares/authentication');
// const Category=require('../models/category')
// const menuItemController = {
//   // Add this function to retrieve a menu item by its ID
//   getMenuItemById: async (req, res, next) => {
//     const { userId } = req.params;

//     try {
//         const menuItems = await MenuItem.findAll({
//             where: { userId: userId },
//             include: {
//                 model: Category,
//                 as: 'Category', // This should match the alias used in your model association
//             },
//         });

//         // Map the queried data to your desired format
//         const formattedMenuItems = menuItems.map((menuItem) => {
//             const {
//                 menuItemId,
//                 price,
//                 name,
//                 imageUrl,
//                 createdAt,
//                 updatedAt,
//                 categoryId,
//                 userId,
//                 Category,
//                 isActive,
//                 veg,
//                 type
//             } = menuItem;

//             return {
//                 menuItemId,
//                 price,
//                 name,
//                 imageUrl,
//                 createdAt,
//                 updatedAt,
//                 categoryId,
//                 userId,
//                 Category: {
//                     categoryId: Category.categoryId,
//                     name: Category.name,
//                     createdAt: Category.createdAt,
//                     updatedAt: Category.updatedAt,
//                     userId: Category.userId,
//                 },
//                 isActive,
//                 veg,
//                 type
//             };
//         });

//         res.json(formattedMenuItems);
//     } catch (err) {
//         return next(err);
//     }
// }

// ,


//     updateMenuItem: async (req, res, next) => {
//         const { categoryId, name,imageUrl,price,isActive,userId, menuItemId, veg,
//             type } = req.body;
//         try {
//           authentication(req,res,async()=>{
//             let obj = {
//                 name: name, 
//                 userId: userId, 
//                 categoryId: categoryId,
//                 imageUrl:imageUrl,
//                 price:price,
//                 isActive:isActive,
//                 veg:veg,
//                 type:type
//             }
//             let response = await MenuItem.update(obj, { where: { menuItemId: menuItemId } });
//             res.json(response)
//           })
//         } catch (err) {
//             return next(err)
//         }
//     },
//     addMenuItem: async (req, res, next) => {
//         try {
//             authentication(req,res,async()=>{
//                 const { name, imageUrl, price, isActive, userId, categoryId,veg,type } = req.body;
    
            
//             if (!name || !imageUrl || !price) {
//                 return res.status(400).json({ message: 'name, imageUrl, and price are required' });
//             }
    
            
//             if (!categoryId) {
//                 return res.status(400).json({ message: 'categoryId is required' });
//             }
    
//             const obj = {
//                 name: name,
//                 userId: userId,
//                 categoryId: categoryId,
//                 imageUrl: imageUrl,
//                 price: price,
//                 isActive: isActive,
//                 veg:veg,
//                 type:type
//             };
    
          
           
    
//             const response = await MenuItem.create(obj);
//             res.json(response);
//             })
//         } catch (err) {
//             return next(err);
//         }
//     }
    
// ,    
    
    
    
//     deleteMenuItem: async (req, res, next) => {
//         const { menuItemId } = req.params;
//         try {
//             let response = await MenuItem.destroy({ where: { menuItemId: menuItemId } });
//             res.json(response)
//         } catch (err) {
//             return next(err)
//         }
//     }

// }
// module.exports = menuItemController;
const MenuItem = require("../models/menuItem");
const authentication = require('../middlewares/authentication');
const Category = require('../models/category');

const WebSocketServer = require('../webSoketConnect');
const CustomErrorHandler = require("../services/CustomErrorHandler");





const menuItemController = {
  getMenuItemById: async (req, res, next) => {
    const { userId } = req.params;

    try {
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
                        type
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
              
                res.json(formattedMenuItems);
    } catch (err) {
      return next(err);
    }
  },

  updateMenuItem: async (req, res, next) => {

  
    try {
      const { categoryId, name, imageUrl, price, isActive, userId, menuItemId, veg, type } = req.body;
      authentication(req, res, async () => {
        const obj = {
          name: name,
          userId: userId,
          categoryId: categoryId,
          imageUrl: imageUrl,
          price: price,
          isActive: isActive,
          veg: veg,
          type: type,
        };
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised())
        }
        // if(req.user.isActive===false){
        //   return res.status(403).json({message:"Your account does't have permission to perform this action"});
        // }
        // Update the menu item in the database
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
                            type
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

          res.json(formattedMenuItems);
        } else {
          res.json({ message: 'No records updated.' });
        }
      });
    } catch (err) {
      return next(err);
    }
  },
  
  

  addMenuItem: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const { name, imageUrl, price, isActive, userId, categoryId, veg, type } = req.body;
  
        if (!name || !imageUrl || !price||!userId||!categoryId||!type) {
          return res.status(400).json({ message: 'all filelds are required' });
        }
  
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised())
        }
        // if(req.user.isActive===false){
        //   return res.status(403).json({message:"Your account does't have permission to perform this action"});
        // }
        // Create a new menu item in the database
        const newItem = await MenuItem.create({
          name,
          userId,
          categoryId,
          imageUrl,
          price,
          isActive,
          veg,
          type,
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
  
        res.json(newItem);
      });
    } catch (err) {
      return next(err);
    }
  },
  

  deleteMenuItem: async (req, res, next) => {
    const { menuItemId,userId } = req.params;
    try {
    authentication(req,res,async()=>{
      if(req.user.userId!==userId){
        return next(CustomErrorHandler.UnAuthorised())
      }
      if (!menuItemId || !userId) {
        return next(CustomErrorHandler.MenuItemError("invalid input!",400))
      }
      // if(req.user.isActive===false){
      //   return res.status(403).json({message:"Your account does't have permission to perform this action"});
      // }
        let response = await MenuItem.destroy({ where: { menuItemId: menuItemId ,userId:userId } });
        if(response===0){
          return next(CustomErrorHandler.NotFound('No such Item Found'))
        }
        WebSocketServer.broadUpdate(userId, response, 'deletedMenu');
        res.json(response);
    })
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = menuItemController;
