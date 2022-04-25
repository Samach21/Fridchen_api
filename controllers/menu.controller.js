const { default: mongoose } = require('mongoose');
const menuService = require('../services/menu.service');

exports.getMenu = async function (req, res, next) {
    const menu_id = req.params.menu_id;
    try {
        const menu = await menuService.getMenu(menu_id);
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getMenus = async function (req, res, next) {
    const menu_ids = req.body.menu_ids;
    try {
        const menus = await menuService.getMenus(menu_ids);
        return res.status(200).json({ status: 200, data: menus });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newMenu = async function (req, res, next) {
    let new_menu = req.body;
    new_menu.family_id = mongoose.Types.ObjectId(new_menu.family_id);
    new_menu.tag_ids =  new_menu.tag_ids.map(tag_id => { return mongoose.Types.ObjectId(tag_id) });
    new_menu.ingredients = new_menu.ingredients.map(ingredient => {
        ingredient.ingredient_id = mongoose.Types.ObjectId(ingredient.ingredient_id);
        ingredient.unit_id = mongoose.Types.ObjectId(ingredient.unit_id);
        return ingredient
    });
    try {
        const menu = await menuService.newMenu(new_menu);
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteMenu = async function (req, res, next) {
    const menu_id = req.params.menu_id;
    try {
        const menu = await menuService.deleteMenu(menu_id);
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}