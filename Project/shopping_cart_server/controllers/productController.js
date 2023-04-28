const Product = require('../models/product');

exports.getAll = (req, res, next) => {
    if (isValidAccessToken(req)) {        
        res.status(200).json(Product.getAll());
    }
    else {        
        next(new Error('Invalid Access Token'));
    }
};

function isValidAccessToken(req) {
    const accessToken = req.headers['access-token'];
    if (!accessToken || accessToken === '') {
        return false;
    }

    return true;
}