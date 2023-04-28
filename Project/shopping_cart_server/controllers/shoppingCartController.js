const ShoppingCart = require('../models/shoppingCart');
const Product = require('../models/product');


exports.getShoppingCartByUsername = (req, res, next) => {
    if (isValidAccessToken(req))
    {
        const shoppingCart = ShoppingCart.getShoppingCartByUsername(req.params.username);
        res.status(200).json(shoppingCart);        
    }
    else
    {
        next(new Error('Invalid Access Token'));
    }
};

exports.save = (req, res, next) => {
    if (isValidAccessToken(req)) {
        
        const newItem = new ShoppingCart(
            req.body.id,            
            req.body.productName,
            req.body.productPrice,
            req.body.productPrice * req.body.productQuantity,
            req.body.productQuantity,
            req.body.username
        );

        const shoppingCartRow = ShoppingCart.getShoppingCartByUsernameProductName(
            req.body.username,
            req.body.productName
        );

        let savedItem;

        if (!shoppingCartRow) {
            savedItem = newItem.save();
            res.status(201).json(newItem);
        }
        else {
            let productQuantity = parseInt(shoppingCartRow.productQuantity) + parseInt(newItem.productQuantity);
            let currentStock = Product.getCurrentStock(req.body.productName);

            if (productQuantity <= currentStock) {                
                newItem.id = shoppingCartRow.id;
                newItem.productQuantity = productQuantity;
                savedItem = newItem.edit();
                res.status(200).json(newItem);
            }
            else
            {
                next(new Error('The quantity cannot exceed the stock limit: ' + currentStock));
            }
        }

        if (!savedItem) {
            next(new Error('Error happen in save!!'));
        }
    }
    else
    {
        next(new Error('Invalid Access Token'));
    }
};

exports.placeOrder = (req, res, next) => {
    if (isValidAccessToken(req)) {
        // update stock product
        const shoppingCart = ShoppingCart.getShoppingCartByUsername(req.params.username);
        const outOfStockProducts = Product.updateProductStock(shoppingCart);

        //clear shopping cart
        const lastIndex = ShoppingCart.placeOrder(req.params.username);

        if (outOfStockProducts !== '') {
            res.status(200).json('The quantity of ' + outOfStockProducts.substring(0, outOfStockProducts.length - 2) + ' exceed(s) the stock limit!!!');
        }
        else {
            res.status(200).json(lastIndex);
        }
    }
    else {
        next(new Error('Invalid Access Token'));
    }
};

exports.edit = (req, res, next) => {
    if (isValidAccessToken(req)) {        
        let currentStock = Product.getCurrentStock(req.body.productName);
        if (req.body.productQuantity <= currentStock)
        {           
            const item = new ShoppingCart(
                req.params.shoppingCartId,
                req.body.productName,
                req.body.productPrice,
                req.body.total,
                req.body.productQuantity,
                req.body.username
            );

            let editedItem = item.edit();

            if (editedItem != undefined) {
                res.status(200).json(editedItem);
            }
            else {
                next(new Error('Error happen in edit!!'));
            }
        }
        else
        {
            next(new Error('The quantity cannot exceed the stock limit: ' + currentStock));
        }
    }
    else
    {
        next(new Error('Invalid Access Token'));
    }
};

exports.deleteById = (req, res, next) => {
    if (isValidAccessToken(req))
    {
        const deletedItem = ShoppingCart.delete(req.params.shoppingCartId);
        if (deletedItem != undefined) {
            res.status(200).json(deletedItem);
        }
        else
        {
            next(new Error('Error happen in deleteById!!'));
        }
    }
    else
    {
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