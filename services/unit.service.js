const Unit = require('../models/unit.model');

exports.getUnit = async function (id) {
    try {
        const unit = await Unit.findById(id);
        return unit
    } catch (e) {
        throw Error(`Error can not find unit_id: ${id}`)
    }
}

exports.newUnit = async function (new_unit) {
    try {
        const unit = new Unit(new_unit);
        unit.save();
        return new_unit
    } catch (e) {
        throw Error('Error can not create new unit')
    }
}