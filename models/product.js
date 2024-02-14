const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productHighlights: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });

const Product = model("product", productSchema);

module.exports = Product;