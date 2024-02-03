const express = require('express');
const app = express();
const bodyPasrser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


require('dotenv/config');
const api = process.env.API_URL
const productsRouter = require('./routers/products');


//middleware
app.use(bodyPasrser.json());
app.use(morgan('tiny'));


//routers
app.use(`${api}/products`, productsRouter)


// Database connection

mongoose.connect('mongodb+srv://<user>:<password>@cluster0.2jre9.mongodb.net/<database>?retryWrites=true&w=majority')
.then(() => {
    console.log('Database connected...')
})
.catch((err) =>{
    console.log(err);
})

app.listen(3000, ()=>{
    
    console.log('server is running on localhost 3000')
})