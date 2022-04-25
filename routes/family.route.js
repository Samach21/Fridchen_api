const express = require('express');
const router = express.Router();
const FamilyController = require('../controllers/family.controller');

router.get('/family_id/:family_id', FamilyController.getFamilyByFamilyID);
router.post('/new_family', FamilyController.newFamily);
router.post('/create_family/:user_id', FamilyController.createFamily);

module.exports = router;