const express = require('express');
const router = express.Router();
const UnitController = require('../controllers/unit.controller');

router.post('/new_unit', UnitController.newUnit);
router.get('/unit_id/:unit_id', UnitController.getUnit);
router.delete('/unit_id/:unit_id', UnitController.deleteUnit);
router.get('/all', UnitController.getAllUnit);

module.exports = router;