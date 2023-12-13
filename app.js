const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes'); 
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes');
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


  
app.use('/user',userRoutes)
app.use('/product',productRoutes)
app.use('/category', categoryRoutes)
app.use('/oder', orderRoutes)