const express = require('express');
const router = express.Router();
const IngredientController = require('../controllers/ingredient.controller');

router.post('/new_ingredient', IngredientController.newIngredient);
router.get('/ingredient_id/:ingredient_id', IngredientController.getIngredient);
router.delete('/ingredient_id/:ingredient_id', IngredientController.deleteIngredient);

module.exports = router;