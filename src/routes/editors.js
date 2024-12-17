const express = require('express');
const router = express.Router();
const editorsController = require('../controllers/editorsController');

router.get('/', editorsController.getAllEditors);
router.post('/create', editorsController.createEditor);
router.post('/delete/:id', editorsController.deleteEditor);

module.exports = router;