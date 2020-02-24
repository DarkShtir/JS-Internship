const sizeOf = require('image-size');
const FileService = require('../services/file-service');
const file_service = new FileService();
class FileController {
	constructor() {}

	upload(req, res) {
		try {
			const result = file_service.upload(req);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	}

	uploadMany(req, res) {
		try {
			const result = file_service.uploadMany(req);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	}
	// getFile(req, res) {
	// 	try {
	// 		const result = file_service.getFile(req);
	// 		res.status(201).send(result);
	// 	} catch (error) {
	// 		res.status(400).send({ error: error.message });
	// 	}
	// }

	// getFile(path) {
	// 	return (req, res) => {
	// 		const newPath = path + '/' + req.params.fileName;
	// 		res.sendFile(newPath, error => {
	// 			if (error) {
	// 				res.send('Файл не найден');
	// 			} else {
	// 				console.log('Файл показан пользователю');
	// 			}
	// 		});
	// 	};
	// }
}
module.exports = FileController;
