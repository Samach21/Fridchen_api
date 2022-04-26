const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');

router.post('/new_menu', MenuController.newMenu);
router.post('/create_menu', MenuController.createMenu);
router.post('/set_is_pin', MenuController.setIsPin);
router.get('/menu_id/:menu_id', MenuController.getMenu);
router.get('/menu_ids', MenuController.getMenus);
router.delete('/menu_id/:menu_id', MenuController.deleteMenu);
router.delete('/menu_id/:menu_id/family_id/:family_id', MenuController.dropMenu);

module.exports = router;