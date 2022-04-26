const Ingredient = require('../models/ingredient.model');

exports.getIngredient = async function (id) {
    try {
        const ingredient = await Ingredient.findById(id);
        return ingredient
    } catch (e) {
        throw Error(`Error can not find ingredient_id: ${id}`)
    }
}

exports.getIngredientByname = async function (name) {
    try {
        const ingredient = await Ingredient.findOne(name);
        return ingredient
    } catch (e) {
        throw Error(`Error can not find ingredient name: ${name}`)
    }
}

exports.checkName = async function (name) {
    try {
        const ingredient = await Ingredient.findOne({name});
        if (ingredient === null) {
            const _ingredient = new Ingredient({name});
            await _ingredient.save();
            return _ingredient
        }
        else return ingredient;
    } catch (e) {
        throw Error(`Error can not find ingredient name: ${name}`)
    }
}

exports.newIngredient = async function (new_ingredient) {
    try {
        const ingredient = new Ingredient(new_ingredient);
        await ingredient.save();
        return ingredient
    } catch (e) {
        throw Error('Error can not create new ingredient')
    }
}

exports.deleteIngredient = async function (id) {
    try {
        const deleted_ingredient = await Ingredient.findByIdAndDelete(id, {returnOriginal: true});
        return deleted_ingredient
    } catch (e) {
        throw Error(`Error can not delete ingredient_id: ${id}`)
    }
}