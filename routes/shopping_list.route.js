const express = require('express');
const router = express.Router();
const ShoppingListController = require('../controllers/shopping_list.controller');

router.get('/family_id/:family_id/ingredient_id/:ingredient_id', ShoppingListController.getShoppingList);
router.get('/family_id/:family_id', ShoppingListController.getAllShoppingListByFamilyID);
router.post('/new_shopping_list', ShoppingListController.newShoppingList);
router.delete('/family_id/:family_id/ingredient_id/:ingredient_id', ShoppingListController.deleteShoppingList);
router.patch('/family_id/:family_id/ingredient_id/:ingredient_id', ShoppingListController.updateShoppingList);

module.exports = router;