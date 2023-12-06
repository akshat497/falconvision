const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user'); // Import the User model

const CoupenCode = sequelize.define('CoupenCode', {
    CoupenCodeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    
}, {
    tableName: 'CoupenCode' // Move this line outside the object passed to define
});

// Define the association between User and CoupenCode


module.exports = CoupenCode;
