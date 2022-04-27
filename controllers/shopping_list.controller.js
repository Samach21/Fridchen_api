const shoppingListService = require('../services/shopping_list.service');
const familyIngredientService = require('../services/family_ingedient.service');
const ingredientService = require('../services/ingredient.service');
const TagService = require('../services/tag.service');

const sendSocket = (io, room, topic, data) => {
    io.to(room).emit(topic, data);
}

const handleShoppingList = (data, ingredient_id) => {
    return {family_id: data.family_id, ingredient_id, is_bought: false}
}

const handleFamilyIngredient = (data, ingredient_id) => {
    let family_ingredient = {};
    family_ingredient.family_id = data.family_id;
    family_ingredient.ingredient_id = ingredient_id;
    family_ingredient.tag_id = data.tag_id;
    return family_ingredient
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

const handleAllShoppingList = async (data) => {
    const shopping_lists = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let shopping_list = {}
        const family_ingredient = await familyIngredientService.getFamilyingedient({family_id: element.family_id, ingredient_id: element.ingredient_id});
        shopping_list.ingredient_id = element.ingredient_id;
        shopping_list.ingredient_name = (await ingredientService.getIngredient(element.ingredient_id)).name;
        shopping_list.tags = await handleTag(family_ingredient.tag_id);
        shopping_list.is_bought = element.is_bought;
        shopping_lists.push(shopping_list);
    }
    return shopping_lists
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

exports.getAllList = async function (req, res, next) {
    const family_id = req.params.family_id;
    try {
        const _shopping_list = await shoppingListService.getAllShoppingListByFamilyID(family_id);
        const shopping_list = await handleAllShoppingList(_shopping_list);
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
        sendSocket(req.io, shopping_list.family_id, 'list', "yes");
        return res.status(200).json({ status: 200, data: shopping_list });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addShoppingList = async function (req, res, next) {
    const _new_shopping_list = req.body
    try {
        const ingredient_id = (await ingredientService.checkName(_new_shopping_list.name)).id;
        const new_shopping_list = handleShoppingList(_new_shopping_list, ingredient_id);
        const new_family_ingredient =  handleFamilyIngredient(_new_shopping_list, ingredient_id);

        const shopping_list = await shoppingListService.newShoppingList(new_shopping_list);
        const family_ingredient = await familyIngredientService.newFamilyingedient(new_family_ingredient);
        sendSocket(req.io, _new_shopping_list.family_id, 'list', "yes");
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
        sendSocket(req.io, family_id, 'list', "yes");
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
        sendSocket(req.io, family_id, 'list', "yes");
        return res.status(200).json({ status: 200, data: shopping_list });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}