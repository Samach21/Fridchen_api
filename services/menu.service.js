const Menu = require('../models/menu.model');
const { default: mongoose } = require('mongoose');

exports.newMenu = async function (query) {
    try {
        const menu = new Menu(query);
        menu.save();
        return query
    } catch (e) {
        throw Error('Error can not create new Menu')
    }
}

exports.getMenu = async function (query) {
    try {
        const menu = await Menu.findById(query);
        return menu
    } catch (e) {
        throw Error(`Error can not find menu_id: ${query}`);
    }
}

exports.getMenus = async function (query) {
    try {
        let arr = []
        for (let i = 0; i < query.length; i++) {
            const element = query[i];
            arr.push(mongoose.Schema.Types.ObjectId(element));
        }
        const menus = await Menu.find({'_id': {$in: arr}});
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