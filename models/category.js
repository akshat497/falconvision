const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const MenuItem = require('./menuItem');

const Category = sequelize.define('Category', {
    // Model attributes are defined here
    categoryId: {
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
    tableName: 'categorys'
});

Category.hasMany(MenuItem, {
    foreignKey: 'categoryId'
})
MenuItem.belongsTo(Category, {
    foreignKey: 'categoryId'
})


module.exports = Category