
const express = require('express')

const userController = require('../../controllers/user-controller') 
const {AuthValidationMiddleware} = require('../../middleware/index')


const router = express.Router();


router.post('/signup', AuthValidationMiddleware.validateUserAuth, userController.create);
router.get('/user/:id', userController.get);
router.post('/signin' , AuthValidationMiddleware.validateUserAuth, userController.signIn);
router.get(
    '/isAuthenticated',
    userController.isAuthenticated
)
router.get(
    '/isAdmin', 
    AuthValidationMiddleware.validateIsAdminRequest, 
    userController.isAdmin
 );



module.exports = router;