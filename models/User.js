
const sequelize = require("../config/db");
const {DataTypes}= require('sequelize');

const User=sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    }, 

    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    phoneNo:{
      type:DataTypes.STRING,
      
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    resetToken:{
        type:DataTypes.STRING,
        allowNull:true
    }
});

module.exports= User;