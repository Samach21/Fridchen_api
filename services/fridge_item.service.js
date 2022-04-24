const { default: mongoose } = require('mongoose');
const FridgeItem = require('../models/fridge_item.model');

exports.getFridgeItem = async function (query) {
    try {
        const fridge_item = await FridgeItem.find({
            family_id: mongoose.Schema.Types.ObjectId(query.family_id),
            ingredient_id: mongoose.Schema.Types.ObjectId(query.ingredient_id)
        });
        return fridge_item
    } catch (e) {
        throw Error(`Error can not find fridge_item. That have family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}

exports.getAllFridgeItemByFamilyID = async function (id) {
    try {
        const fridge_items = await FridgeItem.find({family_id: mongoose.Schema.Types.ObjectId(id)});
        return fridge_items
    } catch (e) {
        throw Error(`Error can not find fridge_item. That have family_id: ${id}`)
    }
}

exports.newFridgeItem = async function (new_fridge_item) {
    try {
        const fridge_item = new FridgeItem(new_fridge_item);
        await fridge_item.save();
        return new_fridge_item
    } catch (e) {
        throw Error('Error can not create new fridge item')
    }
}

exports.updateFridgeItem = async function (query) {
    try {
        const fridge_item = await FridgeItem.findOneAndUpdate({
            family_id: mongoose.Schema.Types.ObjectId(query.family_id), 
            ingredient_id: mongoose.Schema.Types.ObjectId(query.ingredient_id)
        }, query.update_data, {new: true});
        return fridge_item
    } catch (e) {
        throw Error('Error can not update family item');
    }
}