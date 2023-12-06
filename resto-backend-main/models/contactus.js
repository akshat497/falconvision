const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const ContactUs = sequelize.define('contactus', {
    contactUsId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    priority:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
        
    }
}, {
    tableName: 'contactus'
});

module.exports = ContactUs;
