const express = require('express');
const multer = require('multer');
const path = require('path');
const FileController = require('../controllers/file-controller');
const file_controller = new FileController();

const router = new express.Router();

const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, (filename = file.fieldname + path.extname(file.originalname)));
	},
});
const upload = multer({ storage: storageConfig });
const myPath = path.join(__dirname, '../', '/public');

router.use('/static', express.static(myPath));
router.post('/', upload.single('myImage'), file_controller.upload);
module.exports = router;