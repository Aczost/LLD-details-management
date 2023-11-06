global.logger = console.log;
const moment = require('moment-timezone');
const random = require('random-string-alphanumeric-generator');
const nodemailer = require("nodemailer");

const { detailsDb, detailsDbInMongo } = require('../data-access')

const makeGetDetails = require('./get-details.js')
const getDetails = makeGetDetails({ detailsDb, detailsDbInMongo });

const makeAddDetails = require('./add-details.js')
const addDetails = makeAddDetails({ detailsDb, detailsDbInMongo, moment });

const makeUpdateDetails = require('./update-details.js')
const updateDetails = makeUpdateDetails({ detailsDb, detailsDbInMongo });

const makeDeleteDetails = require('./delete-details.js')
const deleteDetails = makeDeleteDetails({ detailsDb, detailsDbInMongo });

const makeAddDetailsInBulk = require('./add-details-in-bulk')
const addDetailsInBulk = makeAddDetailsInBulk({ detailsDb, detailsDbInMongo })

const makeUpdateIfTaskCompleted = require('./update-if-task-completed')
const updateIfTaskCompleted = makeUpdateIfTaskCompleted({ detailsDb, detailsDbInMongo });

const makeUpdateJobDetails = require('./update-if-job-start-or-end');
const updateJobDetails = makeUpdateJobDetails({ detailsDb, detailsDbInMongo });

const makeSendOtpMail = require('./send-otp-mail');
const sendOtpMail = makeSendOtpMail({random, nodemailer});

module.exports = Object.freeze({
    getDetails,
    addDetails,
    updateDetails,
    deleteDetails,
    addDetailsInBulk,
    updateIfTaskCompleted,
    updateJobDetails,
    sendOtpMail
})