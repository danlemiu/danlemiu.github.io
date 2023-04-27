const express = require('express');
const shoppingCartController = require('../controllers/shoppingCartController');
const router = express.Router();

router.get('/', shoppingCartController.getAll);
router.get('/users/:username/carts', shoppingCartController.getShoppingCartByUsername);
router.post('/', shoppingCartController.save);
router.post('/users/:username/place-order', shoppingCartController.placeOrder);
router.put('/:shoppingCartId', shoppingCartController.edit);
router.delete('/:shoppingCartId', shoppingCartController.deleteById);

module.exports = router;