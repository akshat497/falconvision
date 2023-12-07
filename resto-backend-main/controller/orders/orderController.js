const authentication = require("../../middlewares/authentication");
const { Order, Customer, OrderItem } = require("../../models/order");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const WebSocketServer = require("../../webSoketConnect"); // Import your WebSocket server
const MenuItem = require("../../models/menuItem");
const { Op } = require("sequelize");
const CoupenCode = require("../../models/coupenCode");
const CustomResponseHandler = require("../../services/CustomResponseHandler");
const orderController = {
  getOrderByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { page } = req.query;
      const pageSize = Number(page);
      if (!page || isNaN(page) || parseInt(page) <= 0) {
        return res.status(400).json({ message: "Invalid page parameter" });
      }
      authentication(req, res, async () => {
        const { user } = req;

        if (user?.role === "superadmin") {
          const options = {
            where: { userId: userId },
            include: {
              model: Order,
              include: OrderItem,
            },
          };

          options.limit = pageSize;
          // options.offset = (page - 1) * pageSize;

          // Order the results based on the creation date in descending order
          options.order = [["createdAt", "DESC"]];

          const customer = await Customer.findAll(options);

          return res.json(customer);
        } else {
          if (user?.userId !== userId) {
            return next(CustomErrorHandler.UnAuthorised());
          }

          const options = {
            where: { userId: userId },
            include: {
              model: Order,
              include: OrderItem,
            },
          };

          options.limit = pageSize;
          // options.offset = (page - 1) * pageSize;

          // Order the results based on the creation date in descending order
          options.order = [["createdAt", "DESC"]];

          const customer = await Customer.findAll(options);

          if (customer.length === 0) {
            return res.status(404).json({ message: "No more records found" });
          }
          return res.json(customer);
        }
      });
    } catch (err) {
      return next(err);
    }
  },

  getSalesSummary: async (req, res, next) => {
    try {
      // Assuming that authentication middleware sets the user information in the request object
      authentication(req, res, async () => {
        const { startDate, endDate } = req.body;
        const { userId } = req.params; // Adjust this depending on how dates are sent from the frontend
        if (req.user.userId !== userId) {
          return next(CustomErrorHandler.UnAuthorised());
        }
        if (!startDate || !endDate) {
          return res
            .status(400)
            .json({ message: "Both startDate and endDate are required" });
        }

        // Find all customers based on the user-provided date range
        const customers = await Customer.findAll({
          where: {
            userId: req.user.userId, // Filter customers by user ID
          },
          include: {
            model: Order,
            where: {
              createdAt: {
                [Op.gte]: new Date(startDate),
                [Op.lte]: new Date(endDate),
              },
            },
          },
        });

        // Calculate the total sales for all customers
        let totalSales = 0;

        for (const customer of customers) {
          for (const order of customer.Orders) {
            totalSales += Number(order.totalAmount);
          }
        }

        res.json({ customers, totalSales });
      });
    } catch (err) {
      return next(err);
    }
  },
  createOrder: async (req, res, next) => {
    const {
      username,
      items,
      phoneNumber,
      tableNumber,
      createdAt,
      updatedAt,
      userId,
      name,
    } = req.body;

    try {
      if (
        !username ||
        !items ||
        !phoneNumber ||
        !tableNumber ||
        !userId ||
        username.trim() === "" ||
        tableNumber.trim() === "" ||
        phoneNumber.trim() === ""
      ) {
        return res.status(400).send({ message: "Fields missing or invalid" });
      }
      var discountedAmount = 0;
      let fetchedCouponCode = await CoupenCode.findOne({
        where: {
          name,
          userId,
        },
      });

      // Get the valid menu items from the database based on the provided menu item IDs
      const validMenuItems = await MenuItem.findAll({
        where: {
          userId,
          menuItemId: items.map((item) => item.menuItemId),
        },
      });
      const inactiveItemNames = validMenuItems
        .filter((item) => !item.isActive)
        .map((inactiveItem) => inactiveItem.name);

      if (inactiveItemNames.length === 1) {
        return res
          .status(404)
          .json(
            CustomResponseHandler.negativeResponse(
              `${inactiveItemNames.join(
                ", "
              )} is currently not available in the menu`,
              404,
              []
            )
          );
      }
      if (inactiveItemNames.length > 1) {
        return res
          .status(404)
          .json(
            CustomResponseHandler.negativeResponse(
              `${inactiveItemNames.join(
                ", "
              )} are currently not available in the menu`,
              404,
              []
            )
          );
      }

      if (fetchedCouponCode || fetchedCouponCode?.isActive) {
        const totalValidItemsPrice = validMenuItems.reduce((sum, item) => {
          const quantity =
            items.find((cartItem) => cartItem.menuItemId === item.menuItemId)
              ?.quantity || 0;
          return sum + Number(item.price) * quantity;
        }, 0);
        var discountPercentage = fetchedCouponCode?.discount;
        discountedAmount = (discountPercentage / 100) * totalValidItemsPrice;
      }
      // Calculate the total amount based on valid menu items and quantities
      const totalAmount = items.reduce((total, userItem) => {
        const validMenuItem = validMenuItems.find(
          (item) => item.menuItemId === userItem.menuItemId
        );

        if (validMenuItem) {
          // Use the quantity from the user input
          const quantity = userItem.quantity;
          total += validMenuItem.price * quantity;
        }

        return total;
      }, 0);

      // Create a new customer in the database
      const newCustomer = await Customer.create({
        username: username,
        phoneNumber: phoneNumber,
        userId: userId,
        tableNumber: tableNumber,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });

      // Create a new order in the database
      const newOrder = await Order.create({
        totalAmount: totalAmount - discountedAmount,
        customerId: newCustomer.customerId,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });

      // Create OrderItems for valid menu items
      for (const userItem of items) {
        const validMenuItem = validMenuItems.find(
          (item) => item.menuItemId === userItem.menuItemId
        );

        if (validMenuItem) {
          // Use the quantity from the user input
          const quantity = userItem.quantity;

          // Create OrderItem with the correct quantity
          await OrderItem.create({
            item_name: validMenuItem.name,
            quantity: quantity,
            price: validMenuItem.price,
            orderId: newOrder.orderId,
          });
        }
      }

      res.status(200).send({ message: "New order has been created!" });

      // Broadcast the new customer, new order, and order items to the WebSocket
      const customer = await Customer.findAll({
        where: { userId: userId, customerId: newCustomer.customerId },
        include: {
          model: Order,
          include: OrderItem,
        },
      });
      WebSocketServer.broadUpdate(userId, customer, "newOrder");
    } catch (error) {
      console.log("Error", error);
      return next(error);
    }
  },
  updateOrder: async (req, res, next) => {
    const {
      totalamount,
      isActive,
      orderId,
      isRejected,
      isAccepted,
      isCompleted,
      customerId,
      userId,
    } = req.body;

    try {
      // Find the order to update in the database
      authentication(req, res, async () => {
        const order = await Order.findOne({ where: { orderId: orderId } });

        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        // Update the order with the new data
        order.totalAmount = totalamount;
        order.isActive = isActive;
        order.isRejected = isRejected;
        order.isAccepted = isAccepted;
        order.isCompleted = isCompleted;
        order.customerId = customerId;

        // Save the changes to the database
        await order.save();

        // Retrieve the updated order with associated data, including the Customer
        const updatedOrder = await Order.findByPk(orderId, {
          include: [{ model: Customer }, { model: OrderItem }],
        });

        // Broadcast the updated order to all connected clients using WebSocket
        WebSocketServer.broadUpdate(userId, updatedOrder, "updatedOrder");
        // WebSocketServer.broadUpdate(updatedOrder, 'updatedOrder');

        res.json(updatedOrder);
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteOrder: async (req, res, next) => {
    const { orderId } = req.params;

    try {
      // Find the order to delete in the database
      const order = await Order.findByPk(orderId);

      if (!order) {
        return next(CustomErrorHandler.NotFound("Order not found"));
      }

      // Delete the order from the database
      await order.destroy();

      // Broadcast the deleted order to all connected clients using WebSocket
      WebSocketServer.broadcastOrderUpdate({
        orderId: order.orderId,
        deleted: true,
      });

      res.json({ message: "Order deleted" });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = orderController;
