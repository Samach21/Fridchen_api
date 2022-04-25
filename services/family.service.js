const Family = require('../models/family.model');

exports.getFamily = async function (id) {
    try {
        const family = await Family.findById(id);
        return family
    } catch (e) {
        throw Error(`Error can not find family_id: ${id}`);
    }
}

exports.newFamily = async function (new_family) {
    try {
        const family = new Family(new_family);
        await family.save();
        return family
    } catch (e) {
        throw Error('Error can not create new family');
    }
}

exports.updateFamily = async function (query) {
    try {
        const family = await Family.findByIdAndUpdate(query.family_id, query.update_data, {new: true});
        return family
    } catch (e) {
        throw Error('Error can not update family');
    }
}

exports.deleteFamily = async function (id) {
    try {
        const deleted_family = await Family.findByIdAndDelete(id, {returnOriginal: true});
        return deleted_family
    } catch (e) {
        throw Error(`Error can not delete family_id: ${id}`);
    }
}