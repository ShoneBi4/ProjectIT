const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

// DB Connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true })
.then(() => console.log('DB is conneted!'))

mongoose.connection.on('error', (err) => {
    console.log('DB Connection failed:', err.message);
});


const port = process.env.PORT

app.listen(port, () => console.log('App is running on port', port))