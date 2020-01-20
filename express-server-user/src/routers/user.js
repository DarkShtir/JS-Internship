const express = require('express');
const auth = require('../middleware/auth');

const UserController = require('../controllers/user-controller');
const user_controller = new UserController();

const router = new express.Router();

router.get('/', user_controller.getUser);
router.post('/', user_controller.addUser);
router.get('/:id', auth, user_controller.getUserId);
router.get('/:id/pets', auth, user_controller.getUserPets);
router.get('/:id/all_pets', auth, user_controller.getUserWithAllPets);
router.put('/:id', auth, user_controller.updateUser);
router.delete('/:id', auth, user_controller.deleteUser);
router.post('/login', user_controller.login);
router.post('/logout', auth, user_controller.logout);
module.exports = router;
