const ShoppingCart = require('../models/shoppingCart');
const Product = require('../models/product');

exports.save = (req, res, next) => {
    if (!validateAccessToken(req)) {
        next(new Error('Invalid Access Token'));
    }
    else {
        const newItem = new ShoppingCart(
            req.body.id,
            req.body.username,
            req.body.productName,
            req.body.productPrice,
            req.body.productPrice * req.body.productQuantity,
            req.body.productQuantity
        );

        const shoppingCartItem = ShoppingCart.getShoppingCartByUsernameAndProductName(
            req.body.username,
            req.body.productName
        );

        let savedItem;

        if (!shoppingCartItem) {
            savedItem = newItem.save();
            res.status(201).json(newItem);
        }
        else {
            let productQuantity = parseInt(shoppingCartItem.productQuantity) + parseInt(newItem.productQuantity);
            let currentStock = Product.getCurrentStock(req.body.productName);

            if (productQuantity > currentStock) {
                next(new Error('The quantity cannot exceed the stock limit: ' + currentStock));
            }
            else {
                newItem.id = shoppingCartItem.id;
                newItem.productQuantity = productQuantity;
                savedItem = newItem.edit();
                res.status(200).json(newItem);
            }
        }

        if (!savedItem) {
            next(new Error('Error happen in save!!'));
        }
    }
};

exports.getAll = (req, res, next) => {
    if (!validateAccessToken(req)) {
        next(new Error('Invalid Access Token'));
    }
    else {
        const shoppingCart = ShoppingCart.getAll();
        if (shoppingCart != undefined) {
            res.status(200).json(shoppingCart);
        } else {
            next(new Error('Error happen in getAll!'));
        }
    }
};

exports.deleteById = (req, res, next) => {
    if (!validateAccessToken(req)) {
        next(new Error('Invalid Access Token'));
    } else {
        const deletedItem = ShoppingCart.delete(req.params.shoppingCartId);
        if (deletedItem != undefined) {
            res.status(200).json(deletedItem);
        } else {
            next(new Error('Error happen in deleteById!!'));
        }
    }
};

exports.edit = (req, res, next) => {
    if (!validateAccessToken(req)) {
        next(new Error('Invalid Access Token'));
    }
    else {
        let currentStock = Product.getCurrentStock(req.body.productName);
        if (req.body.productQuantity > currentStock) {
            next(new Error('The quantity cannot exceed the stock limit: ' + currentStock));
        }
        else
        {       
            const item = new ShoppingCart(
                req.params.shoppingCartId,
                req.body.username,
                req.body.productName,
                req.body.productPrice,
                req.body.total,
                req.body.productQuantity
            );

            let editedItem = item.edit();

            if (editedItem != undefined) {
                res.status(200).json(editedItem);
            } else {
                next(new Error('Error happen in edit!!'));
            }
        }
    }
};

exports.placeOrder = (req, res, next) => {
    if (!validateAccessToken(req)) {
        next(new Error('Invalid Access Token'));
    }
    else {
        // update stock product
        const shoppingCart = ShoppingCart.getShoppingCartByUsername(req.params.username);
        const outOfStockProducts = Product.updateProductStock(shoppingCart);

        //clear shopping cart
        const lastIndex = ShoppingCart.placeOrder(req.params.username);

        if (outOfStockProducts === '' && lastIndex < 0) {
            res.status(200).json(lastIndex);
        } else {
            if (outOfStockProducts !== '') {
                res.status(200).json('The quantity of ' + outOfStockProducts.substring(0, outOfStockProducts.length - 2) + ' exceed(s) the stock limit!!!');
            }
            else {
                next(new Error('Error happen in placeOrder!'));
            }
        }
    }
};

exports.getShoppingCartByUsername = (req, res, next) => {
    if (!validateAccessToken(req)) {
        next(new Error('Invalid Access Token'));
    } else {
        const shoppingCart = ShoppingCart.getShoppingCartByUsername(req.params.username);
        res.status(200).json(shoppingCart);
    }
};

function validateAccessToken(req) {
  const accessToken = req.headers['access-token'];
    if (!accessToken || accessToken === '') {
        return false;
    }

    return true;
}