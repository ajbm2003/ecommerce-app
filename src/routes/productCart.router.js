const { getAll, create, remove, update } = require('../controllers/productCart.controllers');
const express = require('express');
const verifyJWT= require('../utils/verifyJWT'); 

const productCartRouter = express.Router();

 productCartRouter.route('/cart')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);
    
 productCartRouter.route('/cart/:id')
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports =  productCartRouter