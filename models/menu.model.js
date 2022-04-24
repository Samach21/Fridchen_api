var mongoose = require('mongoose')

const MenuSchema  = new mongoose.Schema({
    family_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    tag_ids: [mongoose.Schema.Types.ObjectId],
    ingredients: [{
        ingredient_id: mongoose.Schema.Types.ObjectId,
        count: Number,
        unit_id: mongoose.Schema.Types.ObjectId
    }],
    steps: [String]
})

const Menu = mongoose.model('menu', MenuSchema)

module.exports = Menu;