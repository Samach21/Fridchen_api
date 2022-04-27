const { default: mongoose } = require('mongoose');
const menuService = require('../services/menu.service');
const ingredientService = require('../services/ingredient.service');
const FamilyService = require('../services/family.service');
const fridgeItemService = require('../services/fridge_item.service');
const shoppingListService = require('../services/shopping_list.service');
const familyIngredientService = require('../services/family_ingedient.service');
const TagService = require('../services/tag.service');
const UnitService = require('../services/unit.service');

const sendSocket = (io, room, topic, data) => {
    io.to(room).emit(topic, data);
}

const handleMenu = async (new_menu) => {
    let menu = {};
    menu.family_id = new_menu.family_id;
    menu.name = new_menu.name;
    menu.tag_ids = new_menu.tag_ids;
    menu.steps = new_menu.steps;
    const ingredients = []
    for (let index = 0; index < new_menu.ingredients.length; index++) {
        const element = new_menu.ingredients[index];
        let ingredient = {}
        ingredient.count = element.count
        ingredient.unit_id = element.unit_id
        ingredient.ingredient_id = (await ingredientService.checkName(element.name))._id;
        ingredients.push(ingredient);
    }
    menu.ingredients = ingredients;
    return menu
}

exports.getMenu = async function (req, res, next) {
    const menu_id = req.params.menu_id;
    try {
        const menu = await menuService.getMenu(menu_id);
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllRecipe = async function (req, res, next) {
   const family_id = req.params.family_id;
    try {
        let family = await FamilyService.getFamily(family_id);
        if (family === null) throw Error(`not found family_id: ${family_id}`);
        const menu_ids = family.menu.map(item => {
            return item.menu_id
        })
        let menus = await menuService.getMenus(menu_ids);
        const handleIngredientInMenu = async (ingredients) => {
            const _ingredients = [];
            for (let index = 0; index < ingredients.length; index++) {
                const ingredient = ingredients[index];
                let _ingredient = {};
                _ingredient.ingredient_id = ingredient.ingredient_id;
                _ingredient.ingredient_name = (await ingredientService.getIngredient(ingredient.ingredient_id)).name;
                _ingredient.count = ingredient.count;
                _ingredient.unit_id = ingredient.unit_id;
                _ingredient.unit_name = (await UnitService.getUnit(ingredient.unit_id)).name;
                _ingredients.push(_ingredient)
            }
            return _ingredients
        }
        const handleTag = async (tags) => {
            const _tags = [];
            for (let index = 0; index < tags.length; index++) {
                const tag_id = tags[index];
                let _tag = {};
                _tag.tag_id = tag_id;
                const tag = await TagService.getTag(tag_id);
                _tag.tag_name = tag.name;
                _tag.color = tag.color;
                _tags.push(_tag)
            }
            return _tags
        }
        const handleMenu = async (menu1, menu2) => {
            const _menus = [];
            for (let index = 0; index < menu1.length; index++) {
                const item = menu1[index];
                let _menu = {};
                _menu.menu_id = menu2[index]._id;
                _menu.is_pin = item.is_pin;
                _menu.menu_name = menu2[index].name;
                _menu.steps = menu2[index].steps;
                _menu.ingredients = await handleIngredientInMenu(menu2[index].ingredients);
                _menu.tags = await handleTag(menu2[index].tag_ids);
                _menus.push(_menu);
            }
            return _menus
        }
        const menu = await handleMenu(family.menu, menus);
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getMenus = async function (req, res, next) {
    const menu_ids = req.body.menu_ids;
    try {
        const menus = await menuService.getMenus(menu_ids);
        return res.status(200).json({ status: 200, data: menus });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newMenu = async function (req, res, next) {
    let new_menu = req.body;
    try {
        new_menu.family_id = mongoose.Types.ObjectId(new_menu.family_id);
        new_menu.tag_ids =  new_menu.tag_ids.map(tag_id => { return mongoose.Types.ObjectId(tag_id) });
        new_menu.ingredients = new_menu.ingredients.map(ingredient => {
            ingredient.ingredient_id = mongoose.Types.ObjectId(ingredient.ingredient_id);
            ingredient.unit_id = mongoose.Types.ObjectId(ingredient.unit_id);
            return ingredient
        });
        const menu = await menuService.newMenu(new_menu);
        sendSocket(req.io, menu.family_id, 'recipe', "yes");
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createMenu = async function (req, res, next) {
    const _new_menu = req.body;
    const new_menu = await handleMenu(_new_menu);
    try {
        const menu = await menuService.newMenu(new_menu);
        const family = await FamilyService.pushMenu({family_id: new_menu.family_id, menu:{menu_id: menu._id, is_pin: false}});
        sendSocket(req.io, family._id, 'recipe', "yes");
        console.log(menu.id)
        return res.status(200).json({ status: 200, data: {family, menu} });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.shareMenu = async function (req, res, next) {
    const new_family_id = req.body.family_id;
    const menu_id = req.body.menu_id;
    try {
        const family = await FamilyService.pushMenu({family_id: new_family_id, menu:{menu_id, is_pin: false}});
        sendSocket(req.io, new_family_id, 'recipe', "yes");
        return res.status(200).json({ status: 200, data: family });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.dropMenu = async function (req, res, next) {
    const menu_id = req.params.menu_id;
    const family_id = req.params.family_id;
    try {
        const menu = await menuService.deleteMenu(menu_id);
        const family = await FamilyService.pullMenu({family_id, menu:{menu_id: menu._id}});
        sendSocket(req.io, family_id, 'recipe', "yes");
        return res.status(200).json({ status: 200, data: {family, menu} });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteMenu = async function (req, res, next) {
    const menu_id = req.params.menu_id;
    try {
        const menu = await menuService.deleteMenu(menu_id);
        sendSocket(req.io, menu.family_id, 'recipe', "yes");
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.setIsPin = async function (req, res, next) {
    const family_id = req.body.family_id;
    const menu_id = req.body.menu_id;
    const is_pin = req.body.is_pin;
    try {
        const family = await FamilyService.setIsPin({family_id, menu_id, is_pin});
        if (is_pin) {
            const menu = await menuService.getMenu(menu_id);
            const shopping_lists = [];
            const family_ingredients = [];
            for (let index = 0; index < menu.ingredients.length; index++) {
                const element = menu.ingredients[index];
                const fridge_item = await fridgeItemService.getFridgeItem({family_id, ingredient_id: element.ingredient_id});
                if (fridge_item === null || fridge_item.cout_left < element.count){
                    const shopping_list = await shoppingListService.newShoppingList({family_id, ingredient_id: element.ingredient_id});
                    const family_ingredient = await familyIngredientService.newFamilyingedient({
                        family_id,
                        ingredient_id: element.ingredient_id,
                        unit_id: element.unit_id,
                        is_star: false,
                        tag_id: []
                    });
                    shopping_lists.push(shopping_list);
                    family_ingredients.push(family_ingredient)
                }
            }
            sendSocket(req.io, family_id, 'recipe', "yes");
            sendSocket(req.io, family_id, 'list', "yes");
            return res.status(200).json({ status: 200, data: {family, shopping_lists, family_ingredients} });
        }
        return res.status(200).json({ status: 200, data: family });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.cookMenu = async function (req, res, next) {
    const family_id = req.body.family_id;
    const menu_id = req.body.menu_id;
    try {
        const menu = await menuService.getMenu(menu_id);
        const shopping_lists = [];
        const deleted_family_ingredients = [];
        const deleted_fridge_items = [];
        const new_family_ingredients = []
        const family_ingredients = [];
        for (let index = 0; index < menu.ingredients.length; index++) {
            const element = menu.in[index];
            const fridge_item = await fridgeItemService.getFridgeItem({family_id, ingredient_id: element.ingredient_id});
            if (fridge_item === null) continue;
            const left = fridge_item.cout_left - element.count;
            const family_ingredient = await familyIngredientService.getFamilyingedient({family_id, ingredient_id: element.ingredient_id});
            if (family_ingredient.is_star && left < family_ingredient.min) {
                const shopping_list = await shoppingListService.newShoppingList({family_id, ingredient_id: element.ingredient_id});
                const family_ingredient = await familyIngredientService.newFamilyingedient({
                    family_id,
                    ingredient_id: element.ingredient_id,
                    unit_id: element.unit_id,
                    is_star: false,
                    tag_id: []
                });
                shopping_lists.push(shopping_list); 
                family_ingredients.push(family_ingredient);
            }
            if (left <= 0) {
                const deleted_family_ingredient = await familyIngredientService.deleteFamilyingedient({family_id, ingredient_id: element.ingredient_id});
                const deleted_fridge_item = await fridgeItemService.deleteFridgeItem({family_id, ingredient_id: element.ingredient_id});
                deleted_family_ingredients.push(deleted_family_ingredient);
                deleted_fridge_items.push(deleted_fridge_item);
            }
            else {
                const new_family_ingredient = await familyIngredientService.updateFamilyingedient({
                    family_id, 
                    ingredient_id: element.ingredient_id, 
                    update_data:{cout_left: left}
                });
                new_family_ingredients.push(new_family_ingredient);
            }
        }
        sendSocket(req.io, family_id, 'recipe', "yes");
        sendSocket(req.io, family_id, 'list', "yes");
        sendSocket(req.io, family_id, 'fridge', "yes");
        return res.status(200).json({ status: 200, data: {shopping_lists, family_ingredients, deleted_family_ingredients, deleted_fridge_items, new_family_ingredients} });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateMenu = async function (req, res, next) {
    const menu_id = req.params.menu_id;
    const update_data = req.body;
    try {
        const menu = await menuService.updateMenu({menu_id, update_data});
        sendSocket(req.io, menu.family_id, 'recipe', "yes");
        return res.status(200).json({ status: 200, data: menu });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
