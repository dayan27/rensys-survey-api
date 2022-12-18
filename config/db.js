const Sequelize= require('sequelize');

const sequelize= new Sequelize(process.env.DATABASE_NAME,
    process.env.DATABASE_USER_NAME,
    process.env.DATABASE_PASSWORD,
    {  
      dialect:'mysql',
      host:process.env.DATABASE_HOST,
      port:'3306',
  });

module.exports= sequelize;