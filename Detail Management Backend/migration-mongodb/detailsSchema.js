const mongoose = require('mongoose');
const config = require('../config')
mongoose.connect(config.mongoDb.host)
const detailsManagementSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    cutting: {
        type: String,
        // required: true,
    },
    plywood: {
        type: String,
        // required: true,
    },
    creasing: {
        type: String,
        // required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        // required: true,
    },
    createdBy: String,
    designBy: String,
    designStartedAt: String,
    designEndedAt: String,
    laserBy: String,
    laserStartedAt: String,
    laserEndedAt: String,
    benderBy: String,
    benderStartedAt: String,
    benderEndedAt: String,
    fittingBy: String,
    fittingStartedAt: String,
    fittingEndedAt: String,
    creasingBy: String,
    creasingStartedAt: String,
    creasingEndedAt: String,
    deliveryBy: String,
    deliveryStartedAt: String,
    deliveryEndedAt: String,
    startedAt: String,
    endedAt: String,
    duration: String,
    inProcess: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        // required: true,
    },
    updatedAt: String,
});
const DetailsManagement = mongoose.model('DetailsManagement', detailsManagementSchema);
module.exports =  DetailsManagement

