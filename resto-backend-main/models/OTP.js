// models/Otp.js

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const OTP = sequelize.define('Otp', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = OTP;
