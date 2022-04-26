const shoppingListService = require('../services/shopping_list.service');
const familyIngredientService = require('../services/family_ingedient.service');
const ingredientService = require('../services/ingredient.service');

const handleShoppingList = (data, ingredient_id) => {
    return {family_id: data.family_id, ingredient_id}
}

const handleFamilyIngredient = (data, ingredient_id) => {
    let family_ingredient = {};
    family_ingredient.family_id = data.family_id;
    family_ingredient.ingredient_id = ingredient_id;
    family_ingredient.tag_id = data.tag_id;
    return family_ingredient
}

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

exports.addShoppingList = async function (req, res, next) {
    const _new_shopping_list = req.body
    const ingredient_id = (await ingredientService.checkName(_new_shopping_list.name)).id;
    const new_shopping_list = handleShoppingList(_new_shopping_list, ingredient_id);
    const new_family_ingredient =  handleFamilyIngredient(_new_shopping_list, ingredient_id);
    try {
        const shopping_list = await shoppingListService.newShoppingList(new_shopping_list);
        const family_ingredient = await familyIngredientService.newFamilyingedient(new_family_ingredient);
        return res.status(200).json({ status: 200, data: {shopping_list, family_ingredient} });
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