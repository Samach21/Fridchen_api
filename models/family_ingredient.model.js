var mongoose = require('mongoose')

const FridgeIngredientSchema  = new mongoose.Schema({
    family_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    ingredient_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    tag_id: [mongoose.Schema.Types.ObjectId],
    unit_id: {type: mongoose.Schema.Types.ObjectId},
    min: Number,
    is_star: {type: Boolean, default: false}
})

const FridgeIngredient = mongoose.model('family_ingredient', FridgeIngredientSchema)

module.exports = FridgeIngredient;