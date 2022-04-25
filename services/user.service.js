const { default: mongoose } = require('mongoose');
const User = require('../models/user.model');

exports.getUser = async function (id) {
    try {
        const user = await User.findOne({id});
        return user
    } catch (e) {
        throw Error(`Error can not find user_id: ${id}`);
    }
}

exports.getUserByFamilyID = async function (id) {
    try {
        const user = await User.find({family_ids: id});
        return user
    } catch (e) {
        throw Error(`Error can not find users, that have family_id: ${id}`);
    }
}

exports.newUser = async function (new_user) {
    try {
        const user = new User(new_user);
        await user.save();
        return user
    } catch (e) {
        throw Error('Error can not create new User')
    }
}

exports.updateUser = async function (query) {
    try {
        const user = await User.findOneAndUpdate({id: query.id}, query.update_data, {new: true});
        return user
    } catch (e) {
        throw Error('Error can not update User')
    }
}

exports.newFamily = async function (query) {
    try {
        const user = await User.findOneAndUpdate({id: query.user_id}, {$push: {family_ids: mongoose.Types.ObjectId(query.family_id)}}, {new: true});
        return user
    } catch (e) {
        throw Error('Error can not add new family to user')
    }
}

exports.deleteFamily = async function (query) {
    console.log(query.family_id)
    try {
        const user = await User.findOneAndUpdate({id: query.user_id}, {$pull: {family_ids: mongoose.Types.ObjectId(query.family_id)}}, {new: true});
        return user
    } catch (e) {
        throw Error(`Error can not delete family_id: ${query.family_id} in user`)
    }
}

exports.updateFamily = async function (query) {
    try {
        const user = await User.findOneAndUpdate({id: query.user_id}, {$set: {family_ids: query.family_ids}}, {new: true});
        return user
    } catch (e) {
        throw Error('Error can not update family to user')
    }
}

exports.deleteUser = async function (id) {
    try {
        const user = await User.findOneAndDelete({id}, {returnOriginal: true});
        return user
    } catch (e) {
        throw Error(`Error can not delete user_id: ${id}`)
    }
}