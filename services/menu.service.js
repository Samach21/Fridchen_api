const Menu = require('../models/menu.model');
const { default: mongoose } = require('mongoose');

exports.newMenu = async function (query) {
    try {
        const menu = new Menu(query);
        await menu.save();
        return menu
    } catch (e) {
        throw Error('Error can not create new Menu')
    }
}

exports.getMenu = async function (id) {
    try {
        const menu = await Menu.findById(id);
        return menu
    } catch (e) {
        throw Error(`Error can not find menu_id: ${id}`);
    }
}

exports.getMenus = async function (query) {
    try {
        const menus = await Menu.find({'_id': {$in: query.map( id => {
            return mongoose.Types.ObjectId(id)
        })}});
        return menus
    } catch (e) {
        throw Error(`Error can not find menu_ids: ${query}`);
    }
}

exports.updateMenu = async function (query) {
    try {
        const menu = await Menu.findByIdAndUpdate(query.menu_id, query.update_data, {new: true});
        return menu
    } catch (e) {
        throw Error('Error can not update menu');
    }
}

exports.deleteMenu = async function (id) {
    try {
        const deleted_menu = await Menu.findByIdAndDelete(id, {returnOriginal: true});
        return deleted_menu
    } catch (e) {
        throw Error(`Error can not delete menu_id: ${id}`);
    }
}