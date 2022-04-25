const authRoute = require('./auth.route');
const UserRoute = require('./user.route');
const FamilyRoute = require('./family.route');
const TagRoute = require('./tag.route');
const UnitRoute = require('./unit.route');
const IngredientRoute = require('./ingredient.route');
const MenuRoute = require('./menu.route');
const FridgeItemRoute = require('./fridge_item.route')
const ShoppingListRoute = require('./shopping_list.route')

function build(app) {
  app.use('/', authRoute);
  app.use('/user', UserRoute);
  app.use('/family', FamilyRoute);
  app.use('/tag', TagRoute);
  app.use('/unit', UnitRoute);
  app.use('/ingredient', IngredientRoute);
  app.use('/menu', MenuRoute);
  app.use('/fridge_item', FridgeItemRoute);
  app.use('/shopping_list', ShoppingListRoute);
}

module.exports = build;
