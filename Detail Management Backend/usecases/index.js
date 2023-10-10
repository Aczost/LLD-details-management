global.logger = console.log;
const {detailsDb} = require('../data-access')

const makeGetDetails = require('./get-details.js')
const getDetails = makeGetDetails({detailsDb});

const makeAddDetails = require('./add-details.js')
const addDetails = makeAddDetails({detailsDb});

const makeUpdateDetails = require('./update-details.js')
const updateDetails = makeUpdateDetails({detailsDb});

const makeDeleteDetails = require('./delete-details.js')
const deleteDetails = makeDeleteDetails({detailsDb});

const makeAddDetailsInBulk = require('./add-details-in-bulk')
const addDetailsInBulk = makeAddDetailsInBulk({detailsDb})

const makeUpdateIfTaskCompleted = require('./update-if-task-completed')
const updateIfTaskCompleted = makeUpdateIfTaskCompleted({detailsDb});

module.exports = Object.freeze({
    getDetails,
    addDetails,
    updateDetails,
    deleteDetails,
    addDetailsInBulk,
    updateIfTaskCompleted,
})