var mongoose = require('mongoose')

const IngredientSchema  = new mongoose.Schema({
    name: {type: String, required: true}
})

const Ingredient = mongoose.model('ingredient', IngredientSchema)

module.exports = Ingredient;