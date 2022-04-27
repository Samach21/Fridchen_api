const fridgeItemService = require('../services/fridge_item.service');
const familyIngredientService = require('../services/family_ingedient.service');
const ingredientService = require('../services/ingredient.service');
const TagService = require('../services/tag.service');
const UnitService = require('../services/unit.service');

const sendSocket = (io, room, topic, data) => {
    io.to(room).emit(topic, data);
}

const handleTag = async (tags) => {
    const _tags = [];
    for (let index = 0; index < tags.length; index++) {
        const tag_id = tags[index];
        let _tag = {};
        _tag.tag_id = tag_id;
        const tag = await TagService.getTag(tag_id);
        _tag.tag_name = tag.name;
        _tag.color = tag.color;
        _tags.push(_tag)
    }
    return _tags
}

const handleAllFridgeItem = async (data) => {
    const fridge_items = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let fridge_item = {}
        let family_ingredient = await familyIngredientService.getFamilyingedient({family_id: element.family_id, ingredient_id: element.ingredient_id});
        if (family_ingredient === null) continue;
        fridge_item.ingredient_id = element.ingredient_id;
        fridge_item.ingredient_name = (await ingredientService.getIngredient(element.ingredient_id)).name;
        fridge_item.cout_left = element.cout_left;
        fridge_item.exp = element.exp;
        fridge_item.is_star = family_ingredient.is_star;
        fridge_item.tags = await handleTag(family_ingredient.tag_id);
        if (!family_ingredient.unit_id) {
            await familyIngredientService.deleteFamilyingedientByID(family_ingredient._id);
            family_ingredient = await familyIngredientService.getFamilyingedient({family_id: element.family_id, ingredient_id: element.ingredient_id});
        }
        fridge_item.unit_id = family_ingredient.unit_id;
        fridge_item.min = family_ingredient.min;
        fridge_item.unit_name = (await UnitService.getUnit(family_ingredient.unit_id)).name;
        fridge_items.push(fridge_item);
    }
    return fridge_items
}

const handleFridgeItem = (data, ingredient_id) => {
    let fridge_item = {};
    fridge_item.family_id = data.family_id;
    fridge_item.cout_left = data.cout_left;
    fridge_item.exp = data.exp;
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
        sendSocket(req.io, new_fridge_item.family_id, 'fridge', "yes");
        return res.status(200).json({ status: 200, data: fridge_item });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addFridgeItem = async function (req, res, next) {
    const data = req.body
    try {
        const ingredient_id = (await ingredientService.checkName(data.name)).id;
        const new_fridge_item = handleFridgeItem(data, ingredient_id);
        const new_family_ingerdient = handleFamilyIngredient(data, ingredient_id);
        const fridge_item = await fridgeItemService.newFridgeItem(new_fridge_item);
        const family_ingerdient = await familyIngredientService.newFamilyingedient(new_family_ingerdient);
        // console.log({fridge_item, family_ingerdient});
        sendSocket(req.io, data.family_id, 'fridge', "yes");
        return res.status(200).json({ status: 200, data: {fridge_item, family_ingerdient} });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllFridge = async function (req, res, next) {
    const family_id = req.params.family_id;
    try {
        const _data_fridge_item = await fridgeItemService.getAllFridgeItemByFamilyID(family_id);
        const data_fridge_item = await handleAllFridgeItem(_data_fridge_item);
        return res.status(200).json({ status: 200, data: data_fridge_item });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteFridgeItem = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const fridge_item = await fridgeItemService.deleteFridgeItem({family_id, ingredient_id});
        sendSocket(req.io, family_id, 'fridge', "yes");
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
        sendSocket(req.io, family_id, 'fridge', "yes");
        return res.status(200).json({ status: 200, data: fridge_item });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.editFridgeItem = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    const data = req.body;
    const handleEditFamilyIngredient = (data, ingredient_id) => {
        let family_ingredient = {};
        if (ingredient_id) family_ingredient.ingredient_id = ingredient_id;
        if (data.tag_id) family_ingredient.tag_id = data.tag_id;
        if (data.unit_id) family_ingredient.unit_id = data.unit_id;
        if (data.min) family_ingredient.min = data.min;
        if (data.is_star) family_ingredient.is_star = data.is_star;
        return family_ingredient
    }
    const handleEditFridgeItem = (data, ingredient_id) => {
        let fridge_item = {};
        if (data.cout_left) fridge_item.cout_left = data.cout_left;
        if (data.exp) fridge_item.exp = data.exp;
        if (ingredient_id) fridge_item.ingredient_id = ingredient_id;
        return fridge_item
    }
    try {
        let _ingredient_id;
        if (data.name) _ingredient_id = (await ingredientService.checkName(data.name)).id;
        const update_fridge_item = handleEditFridgeItem(data, _ingredient_id);
        const update_family_ingredient = handleEditFamilyIngredient(data, _ingredient_id);
        const fridge_item = await fridgeItemService.updateFridgeItem({family_id, ingredient_id, update_data: update_fridge_item});
        const family_ingredient = await familyIngredientService.updateFamilyingedient({family_id, ingredient_id, update_data: update_family_ingredient});
        sendSocket(req.io, family_id, 'fridge', "yes");
        return res.status(200).json({ status: 200, data: {fridge_item, family_ingredient} });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}