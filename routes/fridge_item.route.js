const express = require('express');
const router = express.Router();
const FridgeItemController = require('../controllers/fridge_item.controller');

router.get('/family_id/:family_id/ingredient_id/:ingredient_id', FridgeItemController.getFridgeItem);
router.get('/family_id/:family_id', FridgeItemController.getAllFridgeItemByFamilyID);
router.get('/all/:family_id', FridgeItemController.getAllFridge);
router.post('/new_fridge_item', FridgeItemController.newFridgeItem);
router.post('/add_fridge_item', FridgeItemController.addFridgeItem);
router.delete('/family_id/:family_id/ingredient_id/:ingredient_id', FridgeItemController.deleteFridgeItem);
router.patch('/family_id/:family_id/ingredient_id/:ingredient_id', FridgeItemController.updateFridgeItem);
router.patch('/edit/family_id/:family_id/ingredient_id/:ingredient_id', FridgeItemController.editFridgeItem);

module.exports = router;