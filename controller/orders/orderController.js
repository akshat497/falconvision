const authentication = require("../../middlewares/authentication");
const {Order,Customer,OrderItem} = require("../../models/order");
const WebSocketServer = require("../../webSoketConnect"); // Import your WebSocket server

const orderController = {
    getOrderByUserId: async (req, res, next) => {
       
      
        try {
            const { userId } = req.params;
          // Assuming that authentication middleware sets the user information in the request object
         authentication(req,res,async()=>{
            const { user } = req;
            console.log(user.userId)
            // Check if the authenticated user is authorized to access this information
            if (user.userId !== userId) {
              return res.status(403).json({ error: 'Unauthorized' });
            }
        
            const customer = await Customer.findAll({
              where: { userId: userId },
              include: {
                model: Order,
                include: OrderItem,
              },
            });
        // WebSocketServer.broadUpdate(customer)
            res.json(customer);
         })
        } catch (err) {
          return next(err);
        }
      }
,      

createOrder: async (req, res, next) => {
  const { username, items, phoneNumber, totalAmount, tableNumber, frenchiseId, createdAt, updatedAt, userId } = req.body;

  try {
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
          totalAmount: totalAmount,
          customerId: newCustomer.customerId,
          createdAt: createdAt,
          updatedAt: updatedAt,
      });

      for (const item of items) {
          await OrderItem.create({
              item_name: item.item_name,
              quantity: item.quantity,
              price: item.price,
              orderId: newOrder.orderId,
          });
      }

      res.status(201).send({ message: "New order has been created!" });

      // Broadcast the new customer, new order, and order items to the WebSocket
      const customer = await Customer.findAll({
        where: { userId: userId ,customerId:newCustomer.customerId},
        include: {
          model: Order,
          include: OrderItem,
        },
      });
      WebSocketServer.broadUpdate(customer,"newOrder");
  } catch (error) {
      console.log("Error", error);
      return next(error);
  }
},


updateOrder: async (req, res, next) => {
  const { totalamount, isActive, orderId } = req.body;

  try {
    // Find the order to update in the database
    authentication(req,res,async()=>{
      const order = await Order.findOne({ where: { orderId: orderId } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order with the new data
    order.totalAmount = totalamount;
    order.isActive = isActive;

    // Save the changes to the database
    await order.save();

    // Retrieve the updated order with associated data, including the Customer
    const updatedOrder = await Order.findByPk(orderId, {
      include: [{ model: Customer  }, { model:OrderItem  }],
    });

    // Broadcast the updated order to all connected clients using WebSocket
    // WebSocketServer.broadUpdate(updatedOrder, 'updatedOrder');

    res.json(updatedOrder);
    })
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


,  

  deleteOrder: async (req, res, next) => {
    const { orderId } = req.params;

    try {
      // Find the order to delete in the database
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Delete the order from the database
      await order.destroy();

      // Broadcast the deleted order to all connected clients using WebSocket
      WebSocketServer.broadcastOrderUpdate({ orderId: order.orderId, deleted: true });

      res.json({ message: "Order deleted" });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = orderController;
