const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = Router();

router.get('/', AuthController.Hi);
router.get('/family/:family_id', AuthController.getFamilyByFamilyID);
router.post('/family', AuthController.newFamily);
// router.get('/menu', authController.getMenu);
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


module.exports = {
    router
}