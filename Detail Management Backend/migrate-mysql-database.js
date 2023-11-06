const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const config = require("./config");
// const mysql = config.mysql

const ROOT_PATH = __dirname
let database = config.mysql.database
let username = config.mysql.username
let password = config.mysql.password

const dialectOptions={
    multipleStatements: true,
    decimalNumbers: true,
};

const sequelize = new Sequelize(database, username, password, {
    dialect : config.mysql.dialect,
    port :config.mysql.port,
    host : config.mysql.host,
    dialectOptions : dialectOptions,
});
console.log(ROOT_PATH);
const umzug = new Umzug({
    migrations: {glob : `${ROOT_PATH}/migrations/*.js`},
    context : sequelize.getQueryInterface(),
    storage : new SequelizeStorage({sequelize})
});


(async() =>{
    await umzug.up()
    // await umzug.down()
})();