const fridgeItemService = require('../services/fridge_item.service');
const familyIngredientService = require('../services/family_ingedient.service');
const ingredientService = require('../services/ingredient.service');

const handleFridgeItem = (data, ingredient_id) => {
    let fridge_item = {};
    fridge_item.family_id = data.family_id;
    fridge_item.cout_left = data.cout_left;
    fridge_item.ingredient_id = ingredient_id
    return fridge_item
}

const handleFamilyIngredient = (data, ingredient_id) => {
    let family_ingredient = {};
    family_ingredient.family_id = data.family_id;
    family_ingredient.ingredient_id = ingredient_id;
    family_ingredient.tag_id = data.tag_id;
    family_ingredient.unit_id = data.unit_id;
    family_ingredient.min = data.min;
    family_ingredient.is_star = false;
    return family_ingredient
}

exports.getFridgeItem = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const fridge_item = await fridgeItemService.getFridgeItem({family_id, ingredient_id});
        return res.status(200).json({ status: 200, data: fridge_item });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllFridgeItemByFamilyID = async function (req, res, next) {
    const family_id = req.params.family_id;
    try {
        const fridge_items = await fridgeItemService.getAllFridgeItemByFamilyID(family_id);
        return res.status(200).json({ status: 200, data: fridge_items });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newFridgeItem = async function (req, res, next) {
    const new_fridge_item = req.body
    try {
        const fridge_item = await fridgeItemService.newFridgeItem(new_fridge_item);
        return res.status(200).json({ status: 200, data: fridge_item });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addFridgeItem = async function (req, res, next) {
    const data = req.body
    const ingredient_id = (await ingredientService.checkName(data.name)).id;
    const new_fridge_item = handleFridgeItem(data, ingredient_id);
    const new_family_ingerdient = handleFamilyIngredient(data, ingredient_id);
    try {
        const fridge_item = await fridgeItemService.newFridgeItem(new_fridge_item);
        const family_ingerdient = await familyIngredientService.newFamilyingedient(new_family_ingerdient);
        return res.status(200).json({ status: 200, data: {fridge_item, family_ingerdient} });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteFridgeItem = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const fridge_item = await fridgeItemService.deleteFridgeItem({family_id, ingredient_id});
        return res.status(200).json({ status: 200, data: fridge_item });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateFridgeItem = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const fridge_item = await fridgeItemService.updateFridgeItem({family_id, ingredient_id, update_data: req.body});
        return res.status(200).json({ status: 200, data: fridge_item });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}