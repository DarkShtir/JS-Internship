const express = require('express');
const auth = require('../middleware/auth');

const AlbumController = require('../controllers/album-controller');
const album_controller = new AlbumController();

const router = new express.Router();

router.get('/', album_controller.getAlbum);
router.post('/', auth, album_controller.addAlbum);
router.get('/user/:id', auth, album_controller.getAllAlbumsByUserId);
router.get('/:id', auth, album_controller.getAlbumId);
router.put('/:id', auth, album_controller.updateAlbum);
router.delete('/:id', auth, album_controller.deleteAlbum);

module.exports = router;
