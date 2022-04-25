const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tag.controller');

router.post('/new_tag', TagController.newTag);
router.get('/tag_id/:tag_id', TagController.getTag);
router.delete('/tag_id/:tag_id', TagController.deleteTag);
router.get('/all', TagController.getAllTag);

module.exports = router;