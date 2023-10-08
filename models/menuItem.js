const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const MenuItem = sequelize.define('menuItem', {
    // Model attributes are defined here
    menuItemId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Other model options go here
    tableName: 'menu_items'
});


module.exports = MenuItem