const express = require('express');

const UserController = require('../../controllers/user-controller')
const router = express.Router();
const {AuthReqValidator} = require('../../middlewares/index')
router.post(
    '/signup',
    AuthReqValidator.validateUserAuth,
    UserController.create);
router.post('/signin', 
AuthReqValidator.validateUserAuth,
UserController.signIn);
router.get('/isAuthenticated' ,UserController.isAuthenticated );
router.get('/isAdmin' , AuthReqValidator.validateIsAdmin ,UserController.isAdmin);

module.exports = router;