// const { DataTypes } = require('sequelize');
// const sequelize = require('./index'); // Import your Sequelize database connection


// const Order = sequelize.define('Order', {
//   orderId: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true 
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   phoneNumber: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   totalAmount: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false,
//   },
//   tableNumber: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   frenchiseId: {
//     type: DataTypes.UUID,
//     allowNull: false,
// },

// items: {
//     type: DataTypes.TEXT // Array of JSON objects
//   },
//   isActive: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: true,
// }
//   // Add more fields as needed
// });

// module.exports = Order;

// User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Replace with your database configuration

const Customer = sequelize.define('Customer', {
    customerId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
        
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tableNumber:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// Order.js
const Order = sequelize.define('Order', {
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    couponDiscountPercentage:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0

    },
    isActive: {
        type: DataTypes.BOOLEAN, // Assuming isActive is a boolean field
        allowNull: false,
        defaultValue: true, // Set a default value if needed
    },
    isRejected: {
        type: DataTypes.BOOLEAN, // Assuming isActive is a boolean field
        allowNull: false,
        defaultValue: false, // Set a default value if needed
    },
    isAccepted: {
        type: DataTypes.BOOLEAN, // Assuming isActive is a boolean field
        allowNull: false,
        defaultValue: false, // Set a default value if needed
    },
    isCompleted: {
        type: DataTypes.BOOLEAN, // Assuming isActive is a boolean field
        allowNull: false,
        defaultValue: false, // Set a default value if needed
    },
    message:{
        type : DataTypes.TEXT ,
        allowNull:true,
        

    }
})

// OrderItem.js
const OrderItem = sequelize.define('OrderItem', {
    itemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

// Define Associations
Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

module.exports={Customer,Order,OrderItem}
// const { DataTypes } = require('sequelize');
// const sequelize = require('./index'); // Replace with your database configuration
 
// const User = sequelize.define('User', {
//     userId:{
//         type:DataTypes.UUID,
//         defaultValue:DataTypes.UUIDV4,
//     }
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// });

// // models/order.js

// const Order = sequelize.define('Order', {
//     order_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
// });

// // models/orderItem.js

// const OrderItem = sequelize.define('OrderItem', {
//     item_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     price: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//     },
// });

// // Define associations (e.g., User has many Orders)
// User.hasMany(Order);
// Order.belongsTo(User);
// Order.hasMany(OrderItem);
// OrderItem.belongsTo(Order);

// module.exports = { User, Order, OrderItem };
