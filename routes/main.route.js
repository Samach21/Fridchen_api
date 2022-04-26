const express = require('express');
const router = express.Router();
const MainController = require('../controllers/main.controller');

router.get('/', MainController.Hi);
router.get('/all/:family_id', MainController.getAll);


module.exports = router;
