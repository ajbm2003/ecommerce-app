const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT= require('../utils/verifyJWT'); 
const purchaseRouter = express.Router();

purchaseRouter.route('/purchases')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

module.exports = purchaseRouter;