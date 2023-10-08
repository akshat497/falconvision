const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Category = require('./category');
const MenuItem = require('./menuItem');

const User = sequelize.define('User', {
    // Model attributes are defined here
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        email: true,
        allowNull: false,
        unique: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'customer'
    },
}, {
    // Other model options go here
    tableName: 'users'
});

User.hasMany(Category, {
    foreignKey: 'userId',
    as: 'category'
})
Category.belongsTo(User, {
    foreignKey: 'userId',
})

User.hasMany(MenuItem, {
    foreignKey: 'userId'
})

MenuItem.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = User