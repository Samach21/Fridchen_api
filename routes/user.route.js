const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/new_user', UserController.newUser);
router.get('/user_id/:user_id', UserController.getUser);
router.get('/check_and_get_user', UserController.checkAndGetUser)
router.delete('/user_id/:user_id', UserController.deleteUser);
router.post('/leave/:family_id', UserController.leaveFamily);
router.post('/join/:family_id', UserController.joinFamily);

module.exports = router;