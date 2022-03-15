const express = require('express');
const router = express.Router();

const userController = require('../controllers/score')

router.get('/', userController.index)
router.get('/username/:username', userController.findByUsername)
router.get('/cat/:cat', userController.findByCategory)
router.get('/username/:username/cat/:cat', userController.findByUsernameAndCat)
router.get('/leadersboard', userController.returnLeadersBoard)
//router.post('/cat', userController.upsert)
router.delete('/username/:username', userController.destroy)

module.exports = router;
