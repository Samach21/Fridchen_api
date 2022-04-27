const familyIngredientService = require('../services/family_ingedient.service');

const sendSocket = (io, room, topic, data) => {
    io.to(room).emit(topic, data);
}

exports.getFamilyIngredient = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const family_ingredient = await familyIngredientService.getFamilyingedient({family_id, ingredient_id});
        return res.status(200).json({ status: 200, data: family_ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getFamilyingedients = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_ids = req.body.ingredient_ids;
    try {
        const family_ingredients = await familyIngredientService.getFamilyingedients({family_id, ingredient_ids});
        return res.status(200).json({ status: 200, data: family_ingredients });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newFamilyingedient = async function (req, res, next) {
    const new_family_ingredient = req.body
    try {
        const family_ingredient = await familyIngredientService.newFamilyingedient(new_family_ingredient);
        return res.status(200).json({ status: 200, data: family_ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteFamilyingedient = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const family_ingredient = await familyIngredientService.deleteFamilyingedient({family_id, ingredient_id});
        return res.status(200).json({ status: 200, data: family_ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateFamilyingedient = async function (req, res, next) {
    const family_id = req.params.family_id;
    const ingredient_id = req.params.ingredient_id;
    try {
        const family_ingredient = await familyIngredientService.updateFamilyingedient({family_id, ingredient_id, update_data: req.body});
        return res.status(200).json({ status: 200, data: family_ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.setIsStar = async function (req, res, next) {
    const family_id = req.body.family_id;
    const ingredient_id = req.body.ingredient_id;
    const is_star = req.body.is_star;
    try {
        const family_ingredient = await familyIngredientService.setIsStar({family_id, ingredient_id, is_star});
        sendSocket(req.io, family_id, 'fridge', "yes");
        return res.status(200).json({ status: 200, data: family_ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}