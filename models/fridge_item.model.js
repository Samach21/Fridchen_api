var mongoose = require('mongoose')

const FridgeItemSchema  = new mongoose.Schema({
    family_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    ingredient_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    exp: String,
    cout_left: Number
})

const FridgeItem = mongoose.model('fridge_item', FridgeItemSchema)

module.exports = FridgeItem;