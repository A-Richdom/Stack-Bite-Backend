const express = require('express')
const { addDish, getDishes } = require('../Controllers/DishesController')
const upload = require('../MiddleWares/Upload')

const router = express.Router();

router.post('/addDish', upload.single('file'), addDish);
router.get('/getDishes', getDishes)

module.exports = router;