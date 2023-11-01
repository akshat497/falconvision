const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Category = require('./category'); // Import the Category model

const MenuItem = sequelize.define('menuItem', {
    menuItemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    veg:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(5, 2), // Use DECIMAL to store decimal numbers
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    tableName: 'menu_items'
});

// Define the association with the Category model
MenuItem.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category' });

module.exports = MenuItem;
