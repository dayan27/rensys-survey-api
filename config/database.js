const sequelize= require('../config/db');

const Respondent= require('../models/Respondent');
const Question= require('../models/Question');
const Response= require("../models/Response");
const ResponseChoice= require("../models/ResponseChoice");
const Survey= require("../models/Survey.js");
const User = require("../models/User");
  
Survey.hasMany(Question,{onDelete:'CASCADE', onUpdate:'CASCADE',foreignKey: {
  allowNull: false
}});
Question.belongsTo(Survey);
Survey.hasMany(Respondent, {foreignKey:{allowNull:false}})
Respondent.belongsTo(Survey);

Question.belongsToMany(Respondent, {through:{model:Response,unique:false} });
Respondent.belongsToMany(Question, {through: {model:Response,unique:false} });
Question.hasMany(Response, {onDelete:'CASCADE', onUpdate:'CASCADE'});
Response.belongsTo(Question);

Respondent.hasMany(Response,{onDelete:'CASCADE', onUpdate:'CASCADE'});
Response.belongsTo(Respondent);
  
Question.hasMany(ResponseChoice, {onDelete:'CASCADE', onUpdate:'CASCADE'});
ResponseChoice.belongsTo(Question);
  
sequelize.sync({force:false}).then(()=>{
      console.log('re-sync is done')
  }).catch((err)=>{ 
    console.log('sequelize err',err);
  });
