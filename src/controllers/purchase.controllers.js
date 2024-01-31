const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart= require('../models/ProductCart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [Product],
        where: { userId: req.user.id}
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {id}= req.user;
    const productCart = await ProductCart.findAll({
        where: {userId: id},
        attributes: ['quantity', 'userId', 'productId'],
        raw:true
    })
    const purchases = await Purchase.bulkCreate(productCart);
    await ProductCart.destroy({where: {userId: id}});
    return res.json(purchases);


});

module.exports = {
    getAll,
    create,
}