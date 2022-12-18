const sequelize = require("../config/db");
const {DataTypes}= require('sequelize');

const QuestionOrder=sequelize.define('questionOrder',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },

    order:{
        type:DataTypes.STRING,
        allowNull:false,
    },

});

module.exports= QuestionOrder;