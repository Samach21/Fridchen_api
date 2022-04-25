const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const FamilyController = require('../controllers/family.controller');

router.get('/', AuthController.Hi);
router.get('/family/:family_id', FamilyController.getFamily);
router.post('/family', FamilyController.newFamily);
router.post('/family_by_user/:user_id', FamilyController.createFamily);
// // router.get('/menu', authController.getMenu);
// router.post('/menu', authController.postMenu);
// router.get('/fridge_item/:family_id', authController.getItemsInFridgeByFamilyID);
// router.post('/fridge_item/:family_id', authController.postItemsInFridgeByFamilyID);
// router.delete('/fridge_item/:family_id', authController.deleteItemsInFridgeByFamilyID);
// router.get('/shopping_list/:family_id', authController.getItemsInShoppingListByFamilyID);
// router.post('/shopping_list/:family_id', authController.postItemsInShoppingListByFamilyID);
// router.delete('/shopping_list/:family_id', authController.deleteItemsInShoppingListByFamilyID);
// router.get('/tags', authController.getTags);
// router.get('/tags/:tag_id', authController.getTagsByTagID);
// router.get('/units', authController.getUnits);
// router.get('/units/:unit_id', authController.getUnitsByUnitID);
// router.post('/ingredients', authController.postNewIngredient);
// router.get('/ingredients/:ingredient_id', authController.getIngredientByIngredientID);
// router.post('/family_ingredient', authController.postFamilyIngredient);
// router.get('/all_data/:family_id', authController.allDataByFamilyID);


module.exports = router;
