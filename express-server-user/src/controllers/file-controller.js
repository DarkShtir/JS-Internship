// const FileService = require('../services/file-service');
// const file_service = new FileService();

class FileController {
	constructor() {}
	upload(req, res) {
		const fileData = req.file;
		console.log(fileData);
		if (!fileData) {
			res.send('Ошибка при загрузке файла!!');
		} else {
			res.send('Файл загружен!');
		}
	}
}
module.exports = FileController;
