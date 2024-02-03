# E-Commerce API

This is a simple RESTful API for an e-commerce system built with Node.js, Express.js, and Mongoose. It provides endpoints for creating, reading, updating, and deleting products. Each product can have multiple variants.

## Endpoints

### Create a Product

- **URL:** `/products`
- **Method:** `POST`
- **Body:** JSON object representing the product. Each product has a `name`, `description`, `price`, and an array of `variants`. Each variant has a `name`, `SKU`, `additionalCost`, and `stockCount`.

### Get Products

- **URL:** `/products`
- **Method:** `GET`
- **URL Params:** no params.

### Update a Product and its Variants

- **URL:** `/products/update/:productId`
- **Method:** `PATCH`
- **URL Params:** `productId` is the ID of the product.
- **Body:** JSON object with the fields to update. Variant id is required in the json object for updating variant.

### Delete a Product

- **URL:** `/products/delete/:id`
- **Method:** `DELETE`
- **URL Params:** `id` is the ID of the product.

### Search Products

- **URL:** `/products/search/:key`
- **Method:** `GET`
- **URL Params:** `productname`, `description`, `variantname` are the search terms.

## Setup

1. Install dependencies: `npm install express mongoose morgan body-parser dotenv`
2. Start the server: `npm start`

Please replace `'mongodb+srv://<user>:<password>@cluster0.2jre9.mongodb.net/<database>?retryWrites=true&w=majority'` in `app.js` with your actual MongoDB connection string.

## Schema

- **Product schema**
{
    name: String,
    desc: String,
    price: Number,
    variant: [VariantSchema]
}

- **Variant schema**
{
    name: String,
    SKU: String,
    additionalCost: Number,
    stockCount: Number
}

## Note

This is a basic example and doesn't include validation or error handling you'd want in a production application. You might also want to add more fields to the `Product` and `Variant` models depending on your needs.