const express = require('express');
const router = express.Router();
const FamilyIngredientController = require('../controllers/family_ingredient.controller');

router.get('/family_id/:family_id/ingredient_id/:ingredient_id', FamilyIngredientController.getFamilyIngredient);
router.get('/family_id/:family_id', FamilyIngredientController.getFamilyingedients);
router.post('/new_family_ingerdient', FamilyIngredientController.newFamilyingedient);
router.delete('/family_id/:family_id/ingredient_id/:ingredient_id', FamilyIngredientController.deleteFamilyingedient);
router.patch('/family_id/:family_id/ingredient_id/:ingredient_id', FamilyIngredientController.updateFamilyingedient);

module.exports = router;