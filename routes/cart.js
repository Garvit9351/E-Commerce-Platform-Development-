const { Router } = require("express");
const Cart = require('../models/cart');
const Product = require("../models/product");

const router = Router();

router.get('/items', async (req, res) => {
    const allCartProduct = await Cart.find({});
    return res.render("cart", {
        user: req.user,
        cartProducts: allCartProduct,
    });
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate("createdBy");
    // console.log("product", product);
    const cart = await Cart.create({
        productName: product.productName,
        price: product.price,
        productId: product._id,
        createdBy: req.user._id,
        color: product.color,
    });
    res.redirect('/cart/items');
  });


module.exports = router;