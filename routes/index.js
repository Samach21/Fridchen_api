const mainRoute = require('./main.route');
const UserRoute = require('./user.route');
const FamilyRoute = require('./family.route');
const TagRoute = require('./tag.route');
const UnitRoute = require('./unit.route');
const IngredientRoute = require('./ingredient.route');
const MenuRoute = require('./menu.route');
const FridgeItemRoute = require('./fridge_item.route');
const ShoppingListRoute = require('./shopping_list.route');
const FamilyIngredientRoute = require('./family.ingredient.route');

function build(app) {
  app.use('/', mainRoute);
  app.use('/user', UserRoute);
  app.use('/family', FamilyRoute);
  app.use('/tag', TagRoute);
  app.use('/unit', UnitRoute);
  app.use('/ingredient', IngredientRoute);
  app.use('/menu', MenuRoute);
  app.use('/fridge_item', FridgeItemRoute);
  app.use('/shopping_list', ShoppingListRoute);
  app.use('/family_ingredient', FamilyIngredientRoute);
}

module.exports = build;
