const File = require('../Schemas/DishesSchema')
const { resHandler } = require('../Utility/ResHandler')
const upload = require('../MiddleWares/Upload');
const { response } = require('express');
require('dotenv').config()


//ADDING NEW DISH...//
const addDish = async (req, res) => {
    console.log(req.body);

    const dishImage = req.file.filename
    console.log(dishImage);

    const dishName = req.body.name
    const dishPrice = `$${req.body.price}`;
    const dishQuantity = `${req.body.quantity} bowl${req.body.quantity > 1 ? 's' : ''}`;

    try {
        //check if the file or text uploaded
        if (!req.file || !req.body.name || !req.body.price || !req.body.quantity) {
            return res.status(400).json({ error: "Image/Text box is empty" });
        }
        const newDish = await File.create({
            imgName: dishImage,
            name: dishName,
            price: dishPrice,
            quantity: dishQuantity
        })

        return resHandler({ res, statusCode: 200, data: newDish })

        //send a response back to the client
        // return res.status(200).json({ message: 'File uploaded successfully', avatar, username });
    }
    catch (error) {
        return resHandler({ res, statusCode: 400, data: { error: error.message } })
    }
};

//GETTING DISHES...//
const getDishes = async (req, res) => {

    try {
        const response = await File.find();

        return resHandler({
            res,
            statusCode: 200, data: response
        })
    }
    catch (error) {
        return resHandler({
            res,
            statusCode: 400, data: { error: error.message }
        })
    }
};

//UPDATE DISEHES...//
const updateDish = async (req, res) => {
    const { id } = req.params
    const dishImage = req.file ? req.file.filename : undefined;
    const dishName = req.body.name
    const dishPrice = `$${req.body.price}`;
    const dishQuantity = `${req.body.quantity} bowl${req.body.quantity > 1 ? 's' : ''}`

    try {
        const response = await File.findByIdAndUpdate(id, 

            // {
            //     ...(dishImage && { imgName: dishImage }),  // Only update image if a new one is provided
            //     name: dishName,
            //     price: dishPrice,
            //     quantity: dishQuantity
            // },
            
            { imgName: dishImage, name: dishName, price: dishPrice, quantity: dishQuantity }, {
            new: true
        })
        return resHandler({
            res,
            statusCode: 200, data: response
        })
    }
    catch (error) {
        return resHandler ({ res, statusCode: 400, data: {error: error.message} })
    }
};

//DELETE DISH....//
const deleteDish = async(req, res) => {
    const {id} = req.params

    try {
        const response = await File.findByIdAndDelete({ _id: id });

        return resHandler({ res, statusCode: 200, data: response })
    } 
    catch (error) {
        return resHandler({ res, statusCode: 400, data: {error: error.message} })
    }
};

module.exports = { addDish, getDishes, updateDish, deleteDish };