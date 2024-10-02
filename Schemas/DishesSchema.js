const mongoose = require('mongoose')

const DishesSchema = mongoose.Schema({
    imgName: {
        type: String,
        require: true,
    },
    customer: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    unitAvailable: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
    },
    totalPrice: {
        type: String,
    }
});

module.exports = mongoose.model('File', DishesSchema)