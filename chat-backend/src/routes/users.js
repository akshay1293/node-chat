const express = require('express');
const router = express.Router();
var controller = require('../controllers/user');
var ctrl = controller.one;

router.route('/create').post(ctrl.create);
router.route('/login').post(ctrl.login);
router.route('/verify').get(ctrl.authenticate);
router.route('/list').get(ctrl.list);
router.route('/signout').get(ctrl.signOut);
router.route('/search').get(ctrl.search);

module.exports = router;