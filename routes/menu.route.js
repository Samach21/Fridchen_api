const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');

router.post('/new_menu', MenuController.newMenu);
router.get('/menu_id/:menu_id', MenuController.getMenu);
router.get('/menu_ids', MenuController.getMenus);
router.delete('/menu_id/:menu_id', MenuController.deleteMenu);

module.exports = router;