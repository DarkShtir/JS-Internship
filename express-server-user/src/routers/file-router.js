const express = require('express');
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const FileController = require('../controllers/file-controller');
const file_controller = new FileController();

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
		// cb(null, path.join(__dirname, '../', '/public', `${id}`, `${albumId}`));
		// console.log(newPath);
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
// const myPath = path.join(__dirname, '../', '/public');

// router.use('/static', express.static(myPath));
router.post('/', upload.single('avatar'), file_controller.upload);
router.post('/albums/', upload.array('photos'), file_controller.uploadMany);
// router.get('/:fileName', file_controller.getFile);
module.exports = router;
