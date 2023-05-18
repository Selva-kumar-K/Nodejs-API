const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://selva:1234@cluster0.2jwburr.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
    console.log('MongoDB Connected!')
})
.catch((err) => {
    console.log(err)
})

//route

app.get('/', (req,res) => {

    res.send('Hello from node js!!')

})


app.get('/products', async(req,res) => {
    try {
        const product = await Product.find({})
        res.send(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: error.message})
        
    }

  
})

app.get('/products/:id', async (req,res) => {

    try {
        
        const {id} = req.params
        const product = await Product.findById(id)
        res.send(product)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: error.message})
    }


})

//update

app.put('/products/:id', async(req,res) => {
    try {

        const {id} = req.params

        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(500).json({message: 'No Product found'})
        }
        const updatedProduct = await Product.findById(id)
        res.send(updatedProduct)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.delete('/products/:id', async(req,res) => {
    try {

        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)
        if (!product){
            return res.status(500).json({message: 'No Product found'})
        }

        res.status(200).json({product : "deleted"})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.post('/products', async(req,res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json({data : product})

        
    } catch (error) {
        console.log(error.message);
        res.send(500).json({"message" : error.message})        
    }
})
