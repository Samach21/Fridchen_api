const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');

router.post('/new_menu', MenuController.newMenu);
router.post('/create_menu', MenuController.createMenu);
router.post('/set_is_pin', MenuController.setIsPin);
router.post('/share', MenuController.shareMenu);
router.post('/cook', MenuController.cookMenu);
router.get('/menu_id/:menu_id', MenuController.getMenu);
router.get('/menu_ids', MenuController.getMenus);
router.get('/all/:family_id', MenuController.getAllRecipe);
router.delete('/menu_id/:menu_id', MenuController.deleteMenu);
router.delete('/menu_id/:menu_id/family_id/:family_id', MenuController.dropMenu);
router.patch('/menu_id/:menu_id/', MenuController.updateMenu);

module.exports = router;