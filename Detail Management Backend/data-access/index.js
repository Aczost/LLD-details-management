const mysql2 = require("mysql2")
const config = require("../config")
const mongoose = require('mongoose');
const DetailsModel = require('../migration-mongodb/detailsSchema');

const mysql = mysql2.createPool({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database
}).promise();

mongoose.connect(config.mongoDb.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// mongoose.connect(config.mongoDb.host);
// const db = mongoose.connection;
// db.on('error', err => console.log("Error",err))
// db.once('open',()=>console.info('Connected to the database!!'));


const makeDetailsDb = require('./detailsDb')
const detailsDb = makeDetailsDb({mysql})

const makeDetailsDbInMongo = require('./detailsDbInMongo')
const detailsDbInMongo = makeDetailsDbInMongo({db, DetailsModel})

module.exports = {detailsDb, detailsDbInMongo}