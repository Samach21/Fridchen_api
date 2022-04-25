var mongoose = require('mongoose')

const FamilySchema  = new mongoose.Schema({
    name: {type: String, unique: true, required : true},
    menu: [{
        menu_id: mongoose.Schema.Types.ObjectId,
        is_pin: {type: Boolean, default: false}
    }]
})

const Family = mongoose.model('family', FamilySchema)

module.exports = Family;