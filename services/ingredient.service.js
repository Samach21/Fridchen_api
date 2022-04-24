const Ingredient = require('../models/ingredient.model');

exports.getIngredient = async function (id) {
    try {
        const ingredient = await Ingredient.findById(id);
        return ingredient
    } catch (e) {
        throw Error(`Error can not find ingredient_id: ${id}`)
    }
}

exports.newIngredient = async function (new_ingredient) {
    try {
        const ingredient = new Ingredient(new_ingredient);
        await ingredient.save();
        return new_ingredient
    } catch (e) {
        throw Error('Error can not create new ingredient')
    }
}