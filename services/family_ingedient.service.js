const { default: mongoose } = require('mongoose');
const Familyingedient = require('../models/family_ingredient.model');

exports.newFamilyingedient = async function (new_family_ingredient) {
    try {
        const family_ingredient = new Familyingedient(new_family_ingredient);
        family_ingredient.save();
        return new_family_ingredient
    } catch (e) {
        throw Error('Error can not create new family_ingredient')
    }
}

exports.getFamilyingedient = async function (query) {
    try {
        const family_ingredient = await Familyingedient.findOne({
            family_id: mongoose.Schema.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Schema.Types.ObjectId(query.ingredient_id)
        });
        return family_ingredient
    } catch (e) {
        throw Error(`Error can not find family_ingredient that family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}

exports.updateFamilyingedient = async function (query) {
    try {
        const family_ingredient = await Familyingedient.findOneAndUpdate({
            family_id: mongoose.Schema.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Schema.Types.ObjectId(query.ingredient_id)
        }, query.update_data, {new: true});
        return family_ingredient
    } catch (e) {
        throw Error('Error can not update family ingredient');
    }
}