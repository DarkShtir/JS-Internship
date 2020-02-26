const express = require('express');
const auth = require('../middleware/auth');

const PhotoController = require('../controllers/photo-controller');
const photo_controller = new PhotoController();

const router = new express.Router();

router.get('/', photo_controller.getPhoto);
router.post('/', auth, photo_controller.addPhoto);
router.get('/:id', auth, photo_controller.getPhotoId);
router.put('/:id', auth, photo_controller.updatePhoto);
router.delete('/:id', auth, photo_controller.deletePhoto);

module.exports = router;
