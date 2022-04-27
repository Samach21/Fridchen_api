const { default: mongoose } = require('mongoose');
const Familyingedient = require('../models/family_ingredient.model');

exports.newFamilyingedient = async function (new_family_ingredient) {
    try {
        const family_ingredient = new Familyingedient(new_family_ingredient);
        await family_ingredient.save();
        return family_ingredient
    } catch (e) {
        throw Error('Error can not create new family_ingredient')
    }
}

exports.getFamilyingedient = async function (query) {
    try {
        const family_ingredient = await Familyingedient.findOne({
            family_id: mongoose.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Types.ObjectId(query.ingredient_id)
        });
        return family_ingredient
    } catch (e) {
        throw Error(`Error can not find family_ingredient that family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}

exports.getFamilyingedients = async function (query) {
    try {
        const family_ingredients = await Familyingedient.find({
            family_id: mongoose.Types.ObjectId(query.family_id), 
            ingredient_id: {$in: query.ingredient_ids.map( item => {
                return mongoose.Types.ObjectId(item);
            })}
        });
        return family_ingredients
    } catch (e) {
        throw Error(`Error can not find family_ingredients that family_id: ${query.family_id} and ingredient_ids: ${query.ingredient_ids}`)
    }
}

exports.updateFamilyingedient = async function (query) {
    try {
        const family_ingredient = await Familyingedient.findOneAndUpdate({
            family_id: mongoose.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Types.ObjectId(query.ingredient_id)
        }, query.update_data, {new: true});
        return family_ingredient
    } catch (e) {
        throw Error('Error can not update family ingredient');
    }
}

exports.setIsStar = async function (query) {
    try {
        const family_ingredient = await Familyingedient.findOneAndUpdate({
            family_id: mongoose.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Types.ObjectId(query.ingredient_id)
        }, {is_star: query.is_star}, {new: true});
        return family_ingredient
    } catch (e) {
        throw Error('Error can not update family ingredient');
    }
}

exports.deleteFamilyingedient = async function (query) {
    try {
        const deleted_family_ingredient = await Familyingedient.findOneAndDelete({
            family_id: mongoose.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Types.ObjectId(query.ingredient_id)
        }, {returnOriginal: true});
        return deleted_family_ingredient
    } catch (e) {
        throw Error(`Error can not delete family_ingredient that family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}

exports.deleteFamilyingedientByID = async function (id) {
    try {
        const deleted_family_ingredient = await Familyingedient.findByIdAndDelete(id, {returnOriginal: true});
        return deleted_family_ingredient
    } catch (e) {
        throw Error(`Error can not delete family_ingredient that family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}