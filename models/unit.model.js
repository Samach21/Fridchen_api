var mongoose = require('mongoose')

const UnitSchema  = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
})

const Unit = mongoose.model('unit', UnitSchema)

module.exports = Unit;