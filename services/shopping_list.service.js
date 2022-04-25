const { default: mongoose } = require('mongoose');
const ShoppingList = require('../models/shopping_list.model');

exports.getShoppingList = async function (query) {
    try {
        const shopping_list = await ShoppingList.findOne({
            family_id: mongoose.Types.ObjectId(query.family_id),
            ingredient_id: mongoose.Types.ObjectId(query.ingredient_id)
        });
        return shopping_list
    } catch (e) {
        throw Error(`Error can not find shopping list. That have family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}

exports.getAllShoppingListByFamilyID = async function (id) {
    try {
        const shopping_lists = await ShoppingList.find({family_id: mongoose.Types.ObjectId(id)});
        return shopping_lists
    } catch (e) {
        throw Error(`Error can not find shopping lists. That have family_id: ${id}`)
    }
}

exports.newShoppingList = async function (new_shopping_list) {
    try {
        const shopping_list = new ShoppingList(new_shopping_list);
        await shopping_list.save();
        return shopping_list
    } catch (e) {
        throw Error('Error can not create new shopping list')
    }
}

exports.updateShoppingList = async function (query) {
    try {
        const shopping_list = await ShoppingList.findOneAndUpdate({
            family_id: mongoose.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Types.ObjectId(query.ingredient_id)
        }, query.update_data, {new: true});
        return shopping_list
    } catch (e) {
        throw Error('Error can not update shopping list');
    }
}

exports.deleteShoppingList = async function (query) {
    try {
        const deleted_shopping_list = await ShoppingList.findOneAndDelete({
            family_id: mongoose.Types.ObjectId(query.family_id),
            ingredient_id: mongoose.Types.ObjectId(query.ingredient_id)
        }, {returnOriginal: true});
        return deleted_shopping_list
    } catch (e) {
        throw Error(`Error can not delete shopping list. That have family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}