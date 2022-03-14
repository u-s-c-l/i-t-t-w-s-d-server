const express = require('express');
const router = express.Router();
//const { verifyToken } = require('../middleware/auth')

const userController = require('../controllers/user')

router.get('/', userController.index)
router.get('/:username', userController.findByUsername)

module.exports = router;
