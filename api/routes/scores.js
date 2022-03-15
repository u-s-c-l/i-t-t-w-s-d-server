const express = require('express');
const router = express.Router();

const userController = require('../controllers/score')

router.get('/', userController.index)
router.get('/:username', userController.findByUsername)
//router.get('/:cat', userController.findByCategory)
router.delete('/:username', userController.destroy)

module.exports = router;
