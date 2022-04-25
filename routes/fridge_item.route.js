const express = require('express');
const router = express.Router();
const FridgeItemController = require('../controllers/fridge_item.controller');

router.get('/family_id/:family_id/ingredient_id/:ingredient_id', FridgeItemController.getFridgeItem);
router.get('/family_id/:family_id', FridgeItemController.getAllFridgeItemByFamilyID);
router.post('/new_fridge_item', FridgeItemController.newFridgeItem);
router.delete('/family_id/:family_id/ingredient_id/:ingredient_id', FridgeItemController.deleteFridgeItem);
router.patch('/family_id/:family_id/ingredient_id/:ingredient_id', FridgeItemController.updateFridgeItem);

module.exports = router;