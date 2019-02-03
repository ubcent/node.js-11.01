const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.get('/products', ProductController.getProducts);
router.post('/product', ProductController.addProduct);
router.put('/product/:idProduct', ProductController.updateProduct);
router.delete('/product/:idProduct', ProductController.deleteProduct);
router.put('/product/:idProduct/buy', ProductController.buyProduct);

module.exports = router;