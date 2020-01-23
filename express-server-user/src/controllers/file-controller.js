class FileController {
	constructor() {}
	upload(req, res) {
		const fileData = req.file;
		if (!fileData) {
			res.send('Ошибка при загрузке файла!!');
		} else {
			res.send('Файл загружен!');
		}
	}
	getFile(path) {
		return (req, res) => {
			const newPath = path + '\\' + req.params.fileName;
			res.sendFile(newPath, error => {
				if (error) {
					res.send('Файл не найден');
				} else {
					console.log('Файл показан пользователю');
				}
			});
		};
	}
}
module.exports = FileController;
