const fridgeItemService = require('../services/fridge_item.service');

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