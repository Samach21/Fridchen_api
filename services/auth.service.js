const Family = require('../models/family.model');
const Tag = require('../models/tag.model');
const Unit = require('../models/unit.model');
const Ingredient = require('../models/ingredient.model');
const Familyingedient = require('../models/family_ingredient.model');
const Menu = require('../models/menu.model');
const FridgeItem = require('../models/fridge_item.model');
const { default: mongoose } = require('mongoose');

exports.testFamily = async function (query, page, limit) {
    try {
        var family = new Family({
            name: 'smart',
            members: [],
            menu: [],
        });
        family.save();
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.getFamily = async function (query) {
    try {
        const family = await Family.findById(query);
        return family
    } catch (e) {
        throw Error(`Error can not find family_id: ${query}`)
    }
}

exports.newFamily = async function (query) {
    try {
        const family = new Family(query);
        family.save();
        return query
    } catch (e) {
        throw Error('Error can not create new family')
    }
}

exports.getTag = async function (query) {
    try {
        const tag = await Tag.findById(query);
        return tag
    } catch (e) {
        throw Error(`Error can not find tag_id: ${query}`)
    }
}

exports.newTag = async function (query) {
    try {
        const tag = new Tag(query);
        tag.save();
        return query
    } catch (e) {
        throw Error('Error can not create new tag')
    }
}

exports.getUnit = async function (query) {
    try {
        const unit = await Unit.findById(query);
        return unit
    } catch (e) {
        throw Error(`Error can not find unit_id: ${query}`)
    }
}

exports.newUnit = async function (query) {
    try {
        const unit = new Unit(query);
        unit.save();
        return query
    } catch (e) {
        throw Error('Error can not create new unit')
    }
}

exports.getIngredient = async function (query) {
    try {
        const ingredient = await Ingredient.findById(query);
        return ingredient
    } catch (e) {
        throw Error(`Error can not find ingredient_id: ${query}`)
    }
}

exports.newIngredient = async function (query) {
    try {
        const ingredient = new Ingredient(query);
        ingredient.save();
        return query
    } catch (e) {
        throw Error('Error can not create new ingredient')
    }
}

exports.newFamilyingedient = async function (query) {
    try {
        const family_ingredient = new Familyingedient(query);
        family_ingredient.save();
        return query
    } catch (e) {
        throw Error('Error can not create new family_ingredient')
    }
}

exports.getFamilyingedient = async function (query) {
    try {
        const family_ingredient = await Familyingedient.find({family_id: query.family_id}, {ingredient_id: query.ingredient_id});
        return family_ingredient
    } catch (e) {
        throw Error(`Error can not find family_ingredient that family_id: ${query.family_id} and ingredient_id: ${query.ingredient_id}`)
    }
}

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
        throw Error(`Error can not find menu_id: ${query}`)
    }
}

exports.getMenus = async function (query) {
    try {
        let arr = []
        for (let i = 0; i < query.length; i++) {
            const element = query[i];
            arr.push(mongoose.Types.ObjectId(element))
        }
        const menus = await Menu.find({'_id': {$in: arr}})
        return menus
    } catch (e) {
        throw Error(`Error can not find menu_ids: ${query}`)
    }
}

exports.getFridgeItem = async function (query) {
    try {
        const fridge_items = await FridgeItem.find({family_id: query});
        const family_ingredients = await Familyingedient.find({family_id: fridge_items.family_id}, {ingredient_id: fridge_items.ingredient_id});
        return fridge_items
    } catch (e) {
        throw Error(`Error can not find fridge_item. That have family_id: ${query}`)
    }
}