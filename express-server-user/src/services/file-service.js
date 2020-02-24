const sizeOf = require('image-size');

class FileService {
	constructor() {}

	upload(req, res) {
		try {
			const fileData = req.file;
			if (!fileData) {
				throw new Error('Ошибка при загрузке файла!!');
				// res.send('Ошибка при загрузке файла!!');
			} else {
				return req.file.filename;
			}
		} catch (error) {
			console.log('Error in file-service, method upload');
			throw error;
		}
	}

	uploadMany(req, res) {
		try {
			const arrFiles = req.files;
			if (!arrFiles) {
				throw new Error('Ошибка при загрузке файла!!');
			} else {
				let fileNames = [];
				arrFiles.map(async file => {
					const dimension = sizeOf(file.path);
					const fileObject = {
						name: file.filename,
						ownerId: req.body.ownerId,
						albumId: req.body.albumId,
						width: dimension.width,
						height: dimension.height,
					};
					await fileNames.push(fileObject);
				});
				return fileNames;
			}
		} catch (error) {
			console.log('Error in file-service, method uploadMany');
			throw error;
		}
	}

	// getFile(path) {
	// 	const myPath = path.join(__dirname, '../', '/public');
	// 	console.log(myPath);
	// 	return (req, res) => {
	// 		const newPath = myPath + '/' + req.params.fileName;
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
module.exports = FileService;
