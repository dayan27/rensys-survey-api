const sequelize = require("../config/db.js");
const {DataTypes}= require('sequelize');


const Question=sequelize.define('question',{
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      text: {
       allowNull:false,
       type:DataTypes.STRING},
      required: {
       allowNull:false,
       type:DataTypes.BOOLEAN},
       type:{
          allowNull:false,
          type: DataTypes.STRING
       },
      order: {
       allowNull:false,
       type:DataTypes.INTEGER},
},

);

module.exports= Question;