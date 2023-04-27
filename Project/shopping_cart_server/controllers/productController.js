const Product = require('../models/product');

exports.getAll = (req, res, next) => {
    if (!validateAccessToken(req)) {
        next(new Error('Invalid Access Token'));
    }
    else {
        const productList = Product.getAll();
        if (productList != undefined) {
            res.status(200).json(productList);
        }
        else
        {
            next(new Error('Product is null!'));
        }
    }
};

function validateAccessToken(req) {
    const accessToken = req.headers['access-token'];
    if (!accessToken || accessToken === '') {
        return false;
    }

    return true;
}