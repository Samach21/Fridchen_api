const { default: mongoose } = require('mongoose');
const menuService = require('../services/menu.service');
const ingredientService = require('../services/ingredient.service');
const FamilyService = require('../services/family.service');

const handleMenu = async (new_menu) => {
    let menu = {};
    menu.family_id = new_menu.family_id;
    menu.name = new_menu.name;
    menu.tag_ids = new_menu.tag_ids;
    menu.steps = new_menu.steps;
    const ingredients = []
    for (let index = 0; index < new_menu.ingredients.length; index++) {
        const element = new_menu.ingredients[index];
        let ingredient = {}
        ingredient.count = element.count
        ingredient.unit_id = element.unit_id
        ingredient.ingredient_id = (await ingredientService.checkName(element.name))._id;
        ingredients.push(ingredient);
    }
    menu.ingredients = ingredients;
    return menu
}

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

exports.createMenu = async function (req, res, next) {
    const _new_menu = req.body;
    const new_menu = await handleMenu(_new_menu);
    try {
        const menu = await menuService.newMenu(new_menu);
        const family = await FamilyService.pushMenu({family_id: new_menu.family_id, menu:{menu_id: menu._id, is_pin: false}});
        return res.status(200).json({ status: 200, data: {family, menu} });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.dropMenu = async function (req, res, next) {
    const menu_id = req.params.menu_id;
    const family_id = req.params.family_id;
    try {
        const menu = await menuService.deleteMenu(menu_id);
        const family = await FamilyService.pullMenu({family_id, menu:{menu_id: menu._id}});
        return res.status(200).json({ status: 200, data: {family, menu} });
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

exports.setIsPin = async function (req, res, next) {
    const family_id = req.body.family_id;
    const menu_id = req.body.menu_id;
    const is_pin = req.body.is_pin;
    try {
        const family = await FamilyService.setIsPin({family_id, menu_id, is_pin});
        return res.status(200).json({ status: 200, data: family });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}