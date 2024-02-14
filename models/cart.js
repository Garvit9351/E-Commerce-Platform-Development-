const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });

const Cart = model("cart", cartSchema);

module.exports = Cart;