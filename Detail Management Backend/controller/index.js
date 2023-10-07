const useCases = require('../usecases');
const Joi = require('joi')

const makeGetDetailsAction = require('./get-details-action');
const getDetailsAction = makeGetDetailsAction({getDetails: useCases.getDetails})

const makeAddDetailsAction = require('./add-details-action');
const addDetailsAction = makeAddDetailsAction({addDetails: useCases.addDetails})

const makeUpdateDetailsAction = require('./update-details-action');
const updateDetailsAction = makeUpdateDetailsAction({Joi, updateDetails: useCases.updateDetails})

const makeDeleteDetailsAction = require('./delete-details-action');
const deleteDetailsAction = makeDeleteDetailsAction({Joi, deleteDetails: useCases.deleteDetails})

const makeAddDetailsInBulkAction = require('./add-details-in-bulk-action');
const addDetailsInBulkAction = makeAddDetailsInBulkAction({addDetailsInBulk: useCases.addDetailsInBulk})

module.exports = Object.freeze({
    getDetailsAction,
    addDetailsAction,
    updateDetailsAction,
    deleteDetailsAction,
    addDetailsInBulkAction
})