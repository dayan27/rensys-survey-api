const sequelize = require("../config/db");
const {DataTypes}= require('sequelize');

const Response=sequelize.define('response',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },

    answer:{
        type:DataTypes.STRING,
        allowNull:false,
    },

});

module.exports= Response;