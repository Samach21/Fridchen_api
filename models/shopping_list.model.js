var mongoose = require('mongoose')

const ShoppingListSchema  = new mongoose.Schema({
    family_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    ingredient_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    is_bought: {type: Boolean, default: false}
})

const ShoppingList = mongoose.model('shopping_list', ShoppingListSchema)

module.exports = ShoppingList;