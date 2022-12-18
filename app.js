const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv= require('dotenv')
dotenv.config({path: '.env'})
const cors=require('cors')
const surveyRoute= require('./routes/survey');
const questionRoute = require('./routes/question'); 
const responseRoute= require("./routes/response");
const respondentRoute = require("./routes/respondent");
const authRouter = require("./routes/auth")
const app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/api/surveys', surveyRoute);
app.use('/api/questions', questionRoute);
app.use("/api/responses",responseRoute)
app.use("/api/respondents", respondentRoute);
app.use("/api/users", authRouter);
require('./config/database.js'); 
    
module.exports = app;
