const Photo = require('../models/photo-model');

class PhotoService {
	constructor() {}

	add = async function(body) {
		const photo = new Photo(body);
		try {
			await photo.save();
			return photo;
		} catch (error) {
			console.log('Error in Photo service, method add');
			throw error;
		}
	};

	get = async function() {
		try {
			return await Photo.find({});
		} catch (error) {
			console.log('Error in Photo service, method get');
			throw error;
		}
	};

	update = async function(id, body) {
		try {
			return await Photo.findByIdAndUpdate(id, body);
		} catch (error) {
			console.log('Error in Photo service, method update');
			throw error;
		}
	};

	getById = async function(id) {
		try {
			const photo = await Photo.findById(id);
			if (!photo) {
				throw new Error(`Фотографии с данным ID ${id}, не найдено!!!`);
			}
			return photo;
		} catch (error) {
			console.log('Error in Photo service, method getById');
			throw error;
		}
	};

	del = async function(photo) {
		try {
			fs.unlinkSync(photo.path, error => {
				if (error) {
					throw new Error('Удалить photo не получилось :(');
				}
				console.log('Photo Удалено!');
			});
			await Photo.deleteOne({ _id: photo._id });
		} catch (error) {
			console.log('Error in Photo service, method del');
			throw error;
		}
	};
}

module.exports = PhotoService;
