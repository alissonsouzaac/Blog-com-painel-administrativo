const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','alissondev','123456abc',{
    host: 'mysql669.umbler.com',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;
