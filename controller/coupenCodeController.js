const CoupenCode = require("../models/coupenCode");
const authentication = require("../middlewares/authentication");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const MenuItem = require("../models/menuItem");
const { Order } = require("../models/order");

const coupenCodeController = {
  getCoupenCode: async (req, res, next) => {
    try {
      const { userId } = req.params;
      authentication(req, res, async () => {
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }

        const CoupenCodes = await CoupenCode.findAll({ where: { userId } });
        res.status(200).json(CoupenCodes);
      });
    } catch (error) {
      return next(error);
    }
  },

  createCoupenCode: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const { name, userId, discount } = req.body;
        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({ message: 'Coupon name is required and must be a non-empty string.' });
          }
    
          if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: 'User ID is required and must be a string.' });
          }
    
          const discountValue = parseFloat(discount);
          if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
            return res.status(400).json({ message: 'Discount must be a number between 0 and 100.' });
          }
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
        let newCouponCode = await CoupenCode.create({ name, userId, discount });
        console.log("newCouponCode", newCouponCode);
        res.status(200).json({ message: "true",newCouponCode });
      });
    } catch (error) {
      return next(error);
    }
  },
  updateCoupenCode: async (req, res, next) => {
    try {
      authentication(req, res, async () => {
        const { name, isActive, userId, discount, CoupenCodeId } = req.body;
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
        const obj = {
          name,
          isActive,
          discount,
        };
        let findCoupon=await CoupenCode.findAll({where:{CoupenCodeId: CoupenCodeId ,userId:userId}})
        if(findCoupon.length<1){
            return next(CustomErrorHandler.NotFound('NO such item found'));
          

        }
        const response = await CoupenCode.update(obj, {
          where: { CoupenCodeId, userId },
        });

        res.status(200).json({ response });
      });
    } catch (error) {
      return next(error);
    }
  },
  applyCoupenCode: async (req, res, next) => {
    try {
      const { name, userId, totalAmount, items } = req.body;
  
      // Validate required fields
      if (!name || !userId || !items || !totalAmount) {
        return res.status(400).json({ message: 'Invalid request. Check required fields.' });
      }
  
      // Use findOne instead of findAll since you expect only one coupon code
      let fetchedCouponCode = await CoupenCode.findOne({
        where: {
          name,
          userId,
        },
      });
  
      if (!fetchedCouponCode || fetchedCouponCode.isActive === false) {
        return next(CustomErrorHandler.NotFound('Coupon code not found or not active'));
      }
     
      const validMenuItems = await MenuItem.findAll({
        where: {
          userId,
          menuItemId: items.map((item) => item.menuItemId),
        },
      });
  
      // Check if validMenuItems is not empty
      if (!validMenuItems || validMenuItems.length === 0) {
        return res.status(400).json({ message: 'No valid items found for the coupon code.' });
      }
  
      // Calculate the total price of valid items
    const totalValidItemsPrice = validMenuItems.reduce((sum, item) => {
        const quantity = items.find((cartItem) => cartItem.menuItemId === item.menuItemId)?.quantity || 0;
        return sum + Number(item.price) * quantity;
      }, 0);
      // Validate discount percentage
      let discountPercentage = fetchedCouponCode.discount;
      if (isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage > 100) {
        return next(CustomErrorHandler.BadRequest('Invalid discount percentage'));
      }
  
      // Calculate the discounted amount
      const discountedAmount = (discountPercentage / 100) * totalValidItemsPrice;
  
      // Check if the discounted amount exceeds the total amount
      const finalAmount = Math.max(totalAmount - discountedAmount, 0);
  
      res.status(200).json({ message: 'Coupon applied', discountedAmount, finalAmount });
    } catch (error) {
      return next(error);
    }
  }
  
,
  deleteCoupenCode: async (req, res, next) => {
    const { CoupenCodeId, userId } = req.params;
    try {
      authentication(req, res, async () => {
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
        if (!CoupenCodeId || !userId) {
          return next(CustomErrorHandler.MenuItemError("invalid input!", 400));
        }
        // if(req.user.isActive===false){
        //   return res.status(403).json({message:"Your account does't have permission to perform this action"});
        // }
        let response = await CoupenCode.destroy({
          where: { CoupenCodeId: CoupenCodeId, userId: userId },
        });
        if (response === 0) {
          return next(CustomErrorHandler.NotFound("No such Item Found"));
        }
        // WebSocketServer.broadUpdate(userId, response, "deletedMenu");
        res.json(response);
      });
    } catch (err) {
      return next(err);
    }
  },
};
module.exports = coupenCodeController;
