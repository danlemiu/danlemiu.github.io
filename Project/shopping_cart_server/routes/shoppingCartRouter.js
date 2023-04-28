const express = require('express');
const shoppingCartController = require('../controllers/shoppingCartController');

const router = express.Router();


router.get('/users/:username/shoppingcart', shoppingCartController.getShoppingCartByUsername);
router.post('/', shoppingCartController.save);
router.post('/users/:username/placeorder', shoppingCartController.placeOrder);
router.put('/:shoppingCartId', shoppingCartController.edit);
router.delete('/:shoppingCartId', shoppingCartController.deleteById);

module.exports = router;