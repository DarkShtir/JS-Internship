const sizeOf = require('image-size');
const PhotoService = require('./photo-service');
const photo_service = new PhotoService();
const Album = require('../models/album-model');
const Photo = require('../models/photo-model');

class FileService {
	constructor() {}

	upload(file) {
		try {
			const fileData = file;
			if (!fileData) {
				throw new Error('Ошибка при загрузке файла!!');
			} else {
				return file.filename;
			}
		} catch (error) {
			console.log('Error in file-service, method upload');
			throw error;
		}
	}

	uploadMany = async (files, ownerId, albumId) => {
		try {
			const arrFiles = files;
			if (!arrFiles) {
				throw new Error('Ошибка при загрузке файла!!');
			} else {
				let fileNames = [];
				arrFiles.map(async file => {
					const dimension = sizeOf(file.path);
					const fileObject = {
						name: file.filename,
						ownerId: ownerId,
						albumId: albumId,
						width: dimension.width,
						height: dimension.height,
					};
					fileNames.push(fileObject);
				});
				photo_service.addMany(fileNames);
				return fileNames;
			}
		} catch (error) {
			console.log('Error in file-service, method uploadMany');
			throw error;
		}
	};

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
