var mongoose = require('mongoose')

const FamilySchema  = new mongoose.Schema({
    name: String,
    members: [],
    menu: [],
})

const Family = mongoose.model('family', FamilySchema)

module.exports = Family;