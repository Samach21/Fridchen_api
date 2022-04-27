const ingredientService = require('../services/ingredient.service');

exports.getIngredient = async function (req, res, next) {
    const ingredient_id = req.params.ingredient_id;
    try {
        const ingredient = await ingredientService.getIngredient(ingredient_id);
        return res.status(200).json({ status: 200, data: ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newIngredient = async function (req, res, next) {
    const new_ingredient = req.body
    try {
        const ingredient = await ingredientService.newIngredient(new_ingredient);
        return res.status(200).json({ status: 200, data: ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteIngredient = async function (req, res, next) {
    const ingredient_id = req.params.ingredient_id;
    try {
        const ingredient = await ingredientService.deleteIngredient(ingredient_id);
        return res.status(200).json({ status: 200, data: ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.checkName = async function (req, res, next) {
    const name = req.body.name;
    try {
        const ingredient = await ingredientService.checkName(name);
        return res.status(200).json({ status: 200, data: ingredient });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}