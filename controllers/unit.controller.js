const UnitService = require('../services/unit.service');

exports.getUnit = async function (req, res, next) {
    const unit_id = req.params.unit_id;
    try {
        const unit = await UnitService.getUnit(unit_id);
        return res.status(200).json({ status: 200, data: unit });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllUnit = async function (req, res, next) {
    try {
        const unit = await UnitService.getAllUnit();
        return res.status(200).json({ status: 200, data: unit });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.newUnit = async function (req, res, next) {
    const new_unit = req.body
    try {
        const unit = await UnitService.newUnit(new_unit);
        return res.status(200).json({ status: 200, data: unit });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUnit = async function (req, res, next) {
    const unit_id = req.params.unit_id;
    try {
        const unit = await UnitService.deleteUnit(unit_id);
        return res.status(200).json({ status: 200, data: unit });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}