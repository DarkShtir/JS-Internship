const express = require('express');
const auth = require('../middleware/auth');

const PetController = require('../controllers/pet-controller');
const pet_controller = new PetController();

const router = new express.Router();

router.get('/', pet_controller.getPet);
router.post('/', auth, pet_controller.addPet);
router.get('/:id', auth, pet_controller.getPetId);
router.put('/:id', auth, pet_controller.updatePet);
router.delete('/:id', auth, pet_controller.deletePet);
module.exports = router;
