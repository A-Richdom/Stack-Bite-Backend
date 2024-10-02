const express = require('express')
const { addDish, getDishes, updateDish, deleteDish } = require('../Controllers/DishesController')
const upload = require('../MiddleWares/Upload')

const router = express.Router();

router.post('/addDish', upload.single('file'), addDish);
router.get('/getDishes', getDishes);
router.patch('/updateDish/:id', upload.single('file'), updateDish);
router.delete('/deleteDish/:id', deleteDish);

module.exports = router;