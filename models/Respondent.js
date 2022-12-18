
const sequelize = require("../config/db");
const {DataTypes}= require('sequelize');

const Respondent=sequelize.define('respondent',{
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
    phoneNo:{
      type:DataTypes.STRING,
      
    },
    region:{
        type:DataTypes.STRING,
        allowNull:false
    },
    zone:{
        type:DataTypes.STRING,
        allowNull: false        
    },
    woreda:{
        type: DataTypes.STRING,
        allowNull: false
    },
    kebele:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports= Respondent;