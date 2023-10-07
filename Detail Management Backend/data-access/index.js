const mysql2 = require("mysql2")
const config = require("../config")

const mysql = mysql2.createPool({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database
}).promise();

const makeDetailsDb = require('./detailsDb')
const detailsDb = makeDetailsDb({mysql})

module.exports = {detailsDb}