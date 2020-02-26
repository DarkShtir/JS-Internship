const express = require('express');
const auth = require('../middleware/auth');

const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');

const PhotoController = require('../controllers/photo-controller');
const photo_controller = new PhotoController();

const router = new express.Router();

const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		const { ownerId, albumId } = req.body;
		// console.log(ownerId);
		let newPath = '';
		if (albumId) {
			newPath = path.join(
				__dirname,
				'../',
				'/public',
				`${ownerId}`,
				`${albumId}`
			);
		} else {
			newPath = path.join(__dirname, '../', '/public', `${ownerId}`);
		}
		mkdirp.sync(newPath);
		cb(null, newPath);
	},
	filename: (req, file, cb) => {
		cb(
			null,
			(filename =
				file.fieldname + '-' + Date.now() + path.extname(file.originalname))
		);
	},
});

const upload = multer({ storage: storageConfig });

router.get('/', photo_controller.getPhoto);
router.post(
	'/albums/',
	auth,
	upload.array('photos'),
	photo_controller.addManyPhoto
);
router.post('/', auth, upload.single('avatar'), photo_controller.addPhoto);
router.get('/:id', auth, photo_controller.getPhotoId);
router.put('/:id', auth, photo_controller.updatePhoto);
router.delete('/:id', auth, photo_controller.deletePhoto);

module.exports = router;
