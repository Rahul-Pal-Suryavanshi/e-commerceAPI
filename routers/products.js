const Product = require('../models/product');
const express = require('express');
const router = express.Router();



// endpoint for product retrieval


router.get(`/`, async (req, res) => {
    const productList = await Product.find();
    res.send(productList);
})

// endpoint for creating product
router.post(`/`, (req, res) => {
    const product = new Product({
        productID: req.body.productID,
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        variant: req.body.variant
    })

    product.save().then((createdProduct => {
        res.status(200).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })


})


// endpoint for searching product using product name, description or variant name

router.get('/search/:key', async (req, res) => {

    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: req.params.key, $options: 'i' } },
                { desc: { $regex: req.params.key, $options: 'i' } },
                { "variant.name": { $regex: req.params.key, $options: 'i' } }
            ]
        });

        res.send(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})



//endpoint for updating product data

router.patch('/update/:_id', async (req, res) => {
    try {
        const product = await Product.findById(req.params._id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Update product fields
        if (req.body.name) {
            product.name = req.body.name;
            console.log('name updated');
        }
        if (req.body.desc) {
            product.desc = req.body.desc;
            console.log('desc updated');
        }

        if (req.body.price) {
            product.price = req.body.price;
            console.log('price updated');
        }
        console.log('line 80');

        // Update variant fields

        if (req.body.variant && Array.isArray(req.body.variant)) {
            req.body.variant.forEach(variantUpdate => {
                console.log('for each');
                const variants = product.variant.id(variantUpdate._id);
                if (variants) {
                    if (variantUpdate.name) {
                        variants.name = variantUpdate.name;
                    }
                    if (variantUpdate.SKU) {
                        variants.SKU = variantUpdate.SKU;
                    }
                    if (variantUpdate.additionalCost) {
                        variants.additionalCost = variantUpdate.additionalCost;
                    }
                    if (variantUpdate.stockCount) {
                        variants.stockCount = variantUpdate.stockCount;
                    }
                }
            });
        }

        await product.save();
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});



//endpoint for deleting product------------>

router.delete('/delete/:_id', async (req, res) => {
    try {
        const product = await Product.findById(req.params._id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        await product.deleteOne({ _id: req.params.id });
        res.send('Product deleted');
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;