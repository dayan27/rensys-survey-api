const sequelize = require("../config/db.js");
const { DataTypes } = require('sequelize');

const Survey = sequelize.define('survey', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openingAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    closingAt: {
        type: DataTypes.DATE,
        allowNull: false
    }

},

);

module.exports = Survey;