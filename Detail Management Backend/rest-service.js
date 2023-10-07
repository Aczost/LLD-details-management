const {
    getDetailsAction,
    addDetailsAction,
    updateDetailsAction,
    deleteDetailsAction,
    addDetailsInBulkAction
} = require('./controller')
const express = require('express');
const router = express.Router();

// ALL API ENDPOINTS
router.get(`/get-details`, (req, res)=>{
    getDetailsAction({req, res})
})

router.post('/add-details', (req, res)=>{
    addDetailsAction({req, res})
})

router.put('/update-details/:id', (req, res)=>{
    updateDetailsAction({req, res})
})

router.delete('/delete-details/:id', (req, res)=>{
    deleteDetailsAction({req, res})
})

router.post('/bulk-insert-details', (req, res)=>{
    addDetailsInBulkAction({req, res})
})

module.exports = {router}

