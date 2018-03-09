const express = require('express');
const router = express.Router();
var ctrl = require('../controllers/user');

router.route('/create').post(ctrl.create);
router.route('/login').post(ctrl.login);
router.route('/verify').get(ctrl.authenticate);

module.exports = router;