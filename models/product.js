const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    name: String,
    SKU: String,
    additionalCost: Number,
    stockCount: Number
});

const productSchema = mongoose.Schema({
    productID: Number,
    name: String,
    desc: String,
    price: Number,
    variant: [VariantSchema]
})

module.exports = mongoose.model('Product', productSchema);
