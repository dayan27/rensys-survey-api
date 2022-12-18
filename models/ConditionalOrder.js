const sequelize = require("../config/db");
const {DataTypes}= require('sequelize');
const ConditionalOrder=sequelize.define('conditionalOrder',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },

});

exports.module= Response;