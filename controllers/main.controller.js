const FamilyService = require('../services/family.service');
const familyIngredientService = require('../services/family_ingedient.service');
const ingredientService = require('../services/ingredient.service');
const fridgeItemService = require('../services/fridge_item.service');
const shoppingListService = require('../services/shopping_list.service');
const menuService = require('../services/menu.service');
const UnitService = require('../services/unit.service');
const TagService = require('../services/tag.service');

exports.Hi = async function (req, res, next) {
    req.io.emit("message", 'hello socket');
    res.send('Hello!');
}

exports.getAll = async function (req, res, next) {
    const family_id = req.params.family_id;
    try {
        let family = await FamilyService.getFamily(family_id);
        if (family === null) throw Error(`not found family_id: ${family_id}`);
        let fridge_items = await fridgeItemService.getAllFridgeItemByFamilyID(family_id);
        let shopping_lists = await shoppingListService.getAllShoppingListByFamilyID(family_id);
        const menu_id = family.menu.map(item => {
            return item.menu_id
        })
        let menus = await menuService.getMenus(menu_id)
        let output = {};
        output.family_id = family._id;
        output.family_name = family.name;
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
        const handleFridgeItem = async (fridge_items) => {
            const _fridge_items = [];
            for (let index = 0; index < fridge_items.length; index++) {
                const ingredient = fridge_items[index];
                let _fridge_item = {};
                _fridge_item.ingredient_id = ingredient.ingredient_id;
                _fridge_item.ingredient_name = (await ingredientService.getIngredient(ingredient.ingredient_id)).name;
                _fridge_item.cout_left = ingredient.cout_left;
                _fridge_item.exp = ingredient.exp;
                const family_ingredients = await familyIngredientService.getFamilyingedient({family_id: ingredient.family_id, ingredient_id: ingredient.ingredient_id});
                if (family_ingredients === null) continue;
                _fridge_item.min = family_ingredients.min;
                _fridge_item.is_star = family_ingredients.is_star;
                _fridge_item.tags = await handleTag(family_ingredients.tag_id);
                _fridge_item.unit_id = family_ingredients.unit_id;
                _fridge_item.unit_name = (await UnitService.getUnit(family_ingredients.unit_id)).name;
                _fridge_items.push(_fridge_item)
            }
            return _fridge_items
        }
        const handleShoppingList = async (shopping_lists) => {
            const _shopping_lists = [];
            for (let index = 0; index < shopping_lists.length; index++) {
                const ingredient = shopping_lists[index];
                let _shopping_list = {};
                _shopping_list.ingredient_id = ingredient.ingredient_id;
                _shopping_list.ingredient_name = (await ingredientService.getIngredient(ingredient.ingredient_id)).name;
                const family_ingredients = await familyIngredientService.getFamilyingedient({family_id: ingredient.family_id, ingredient_id: ingredient.ingredient_id});
                _shopping_list.tags = await handleTag(family_ingredients.tag_id);
                _shopping_list.is_bought = ingredient.is_bought;
                _shopping_lists.push(_shopping_list)
            }
            return _shopping_lists
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
        output.menus = await handleMenu(family.menu, menus);
        output.fridge_items = await handleFridgeItem(fridge_items);
        output.shopping_lists = await handleShoppingList(shopping_lists);
        return res.status(200).json({ status: 200, data: output });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}