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
router.route('/forgotPassword').get(ctrl.forgotPassword);
router.route('/confirmAccount').get(ctrl.confirmAccount);
router.route('/resetPassword').put(ctrl.resetPassword);

module.exports = router;