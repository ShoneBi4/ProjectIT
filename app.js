const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Users =require('./models/users')
const Products = require('./models/Products')
const Category = require('./models/Category')
const Orders = require('./models/orders')
const orderRoutes = require('./routes/orderRoutes')
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const port = process.env.PORT

app.listen(port, (err) => {
    if (err) {
      console.error('Error starting the server:', err.message);
    } else {
      console.log('App is running on port', port);
    }
  });

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB is connected!'))
  .catch((err) => {
    console.error('DB Connection failed:', err.message);
  });





//find Users 
app.get('/user', async(req,res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})
//find Users by id
app.get('/user/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById(id);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})

//update 
app.put("/user/:id",async (req, res) =>{
    try {
        const {id} = req.params;
        const user = await Users.findByIdAndUpdate(id,req.body);
        if (!user){
            return res.status(404).json({message: 'không thể tìm thấy người dùng có id là', id})
        }
        const updatedUser = await Users.findById(id);
        res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

//delete user
app.delete('/user/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findByIdAndDelete(id);
        if (!user){
            return res.status(404).json({message: 'không thể tìm thấy người dùng có id là', id})
        }
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


//creat user
app.post('/user', async (req, res) => {
    try {
        const users = await Users.create(req.body);
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});






//find Products 
app.get('/product', async(req,res) => {
    try {
        const product = await Products.find({});
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})
//find product by id
app.get('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Products.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})

//update product
app.put("/product/:id",async (req, res) =>{
    try {
        const {id} = req.params;
        const product = await Products.findByIdAndUpdate(id,req.body);
        if (!product){
            return res.status(404).json({message: 'không thể tìm thấy sản phẩm có id là', id})
        }
        const updatedProduct = await Products.findById(id);
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})
//delete product
app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Products.findByIdAndDelete(id);
        if (!product){
            return res.status(404).json({message: 'không thể tìm thấy sản phẩm với id là', id})
        }
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


//creat product=
app.post('/product', async (req, res) => {
    try {
        const product = await Products.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});








//find category 
app.get('/category', async(req,res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})
//find category by id
app.get('/category/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        res.status(200).json(category);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})

//update product
app.put("/category/:id",async (req, res) =>{
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id,req.body);
        if (!category){
            return res.status(404).json({message: 'không thể tìm thấy danh sách sản phẩm có id là', id})
        }
        const updatedCategory = await Category.findById(id);
        res.status(200).json(updatedCategory)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})
//delete Category
app.delete('/category/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category){
            return res.status(404).json({message: 'không thể tìm thấy danh sách sản phẩm với id là', id})
        }
        res.status(200).json(category)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})
//creat category
app.post('/category', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});




app.use('/oder', orderRoutes)
