const express = require('express');
const auth = require('../middleware/auth');
const valid = require('../middleware/validation/validation');
const petValid = require('../middleware/validation/pet-validation');

const PetController = require('../controllers/pet-controller');
const pet_controller = new PetController();

const router = new express.Router();

router.get('/', pet_controller.getPet);
router.post('/', auth, valid(petValid), pet_controller.addPet);
router.get('/:id', auth, pet_controller.getPetId);
router.put('/:id', auth, pet_controller.updatePet);
router.delete('/:id', auth, pet_controller.deletePet);
module.exports = router;
