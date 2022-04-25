const shoppingListService = require('../services/shopping_list.service');

exports.getShoppingList = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const shopping_list = await shoppingListService.getShoppingList({family_id, ingredient_id});
        return res.status(200).json({ status: 200, data: shopping_list });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllShoppingListByFamilyID = async function (req, res, next) {
    const family_id = req.params.family_id;
    try {
        const shopping_list = await shoppingListService.getAllShoppingListByFamilyID(family_id);
        return res.status(200).json({ status: 200, data: shopping_list });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newShoppingList = async function (req, res, next) {
    const new_shopping_list = req.body
    try {
        const shopping_list = await shoppingListService.newShoppingList(new_shopping_list);
        return res.status(200).json({ status: 200, data: shopping_list });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteShoppingList = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const shopping_list = await shoppingListService.deleteShoppingList({family_id, ingredient_id});
        return res.status(200).json({ status: 200, data: shopping_list });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateShoppingList = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const shopping_list = await shoppingListService.updateShoppingList({family_id, ingredient_id, update_data: req.body});
        return res.status(200).json({ status: 200, data: shopping_list });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}