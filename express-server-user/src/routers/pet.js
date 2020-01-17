const express = require('express');

const PetController = require('../controllers/pet-controller');
const pet_controller = new PetController();

const router = new express.Router();

router.get('/', pet_controller.getPet);
router.post('/', pet_controller.addPet);
router.get('/:id', pet_controller.getPetId);
router.put('/:id', pet_controller.updatePet);
router.delete('/:id', pet_controller.deletePet);
module.exports = router;
