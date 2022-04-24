var mongoose = require('mongoose')

const UnitSchema  = new mongoose.Schema({
    name: {type: String, required: true}
})

const Unit = mongoose.model('unit', UnitSchema)

module.exports = Unit;