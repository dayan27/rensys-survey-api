const sequelize = require("../config/db");
const {DataTypes}= require('sequelize');

const ResponseChoice=sequelize.define('responseChoice',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },
    text:{
        type:DataTypes.STRING,
        allowNull:false,
    },
});

module.exports= ResponseChoice;