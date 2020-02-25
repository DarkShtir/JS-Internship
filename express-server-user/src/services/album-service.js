const Album = require('../models/album-model');

class AlbumService {
	constructor() {}

	add = async function(body) {
		const album = new Album(body);
		try {
			await album.save();
			return album;
		} catch (error) {
			console.log('Error in Album service, method add');
			throw error;
		}
	};

	get = async function() {
		try {
			return await Album.find({});
		} catch (error) {
			console.log('Error in Album service, method get');
			throw error;
		}
	};

	update = async function(id, body) {
		try {
			return await Album.findByIdAndUpdate(id, body);
		} catch (error) {
			console.log('Error in Album service, method update');
			throw error;
		}
	};

	getById = async function(id) {
		try {
			const album = await Album.findById(id);
			if (!album) {
				throw new Error(`Альбома с данным ID ${id}, не найдено!!!`);
			}
			return user;
		} catch (error) {
			console.log('Error in Album service, method getById');
			throw error;
		}
	};

	// del = async function(photo) {
	// 	try {
	// 		fs.unlinkSync(photo.path, error => {
	// 			if (error) {
	// 				throw new Error('Удалить альбом не получилось :(');
	// 			}
	// 			console.log('Photo Удалено!');
	// 		});
	// 		await Photo.deleteOne({ _id: photo._id });
	// 	} catch (error) {
	// 		console.log('Error in Album service, method del');
	// 		throw error;
	// 	}
	// };
}

module.exports = AlbumService;
