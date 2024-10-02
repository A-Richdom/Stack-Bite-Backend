const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const DishesRoute = require('./Routes/DishesRoute')
require('dotenv').config();

const MongoURL = process.env.MongoURL
const app = express();

//MIDDLE-WARE TO RECEIVE A BODY REQUEST
app.use(cors());
app.use(express.json());

//ROUTE
app.use('/food-ordering', DishesRoute)
app.use('/uploads', express.static('uploads'))

//PORT NUMBER
const port = 5000

const start = async() => {
    try {
        await mongoose.connect(MongoURL)
        console.log('Food-Ordering Web Connected...');

        app.listen(port, 'localhost',
            function () {
                console.log('Server is running on a port', port);
            })
    } 
    catch (error) {
        console.log(error);
    }
}

start()