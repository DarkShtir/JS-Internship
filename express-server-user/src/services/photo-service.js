const sizeOf = require('image-size');
const fs = require('fs');
const path = require('path');

const Photo = require('../models/photo-model');

class PhotoService {
	constructor() {}

	add = async function(file, ownerId, albumId) {
		try {
			if (!file) {
				throw new Error('Ошибка при загрузке файла!!');
			}
			const dimension = sizeOf(file.path);
			const fileObject = {
				name: file.filename,
				ownerId: ownerId,
				albumId: albumId,
				width: dimension.width,
				height: dimension.height,
			};
			const photo = new Photo(fileObject);
			await photo.save();
			return photo;
		} catch (error) {
			console.log('Error in Photo service, method add');
			throw error;
		}
	};

	addMany = async function(ownerId, albumId, files) {
		try {
			if (!files) {
				throw new Error('Ошибка при загрузке файла!!');
			}
			// console.log('files:', files);
			// console.log('ownerId:', ownerId);
			// console.log('albumId:', albumId);
			let fileNames = [];
			files.map(async file => {
				const dimension = sizeOf(file.path);
				const fileObject = {
					name: file.filename,
					ownerId: ownerId,
					albumId: albumId,
					width: dimension.width,
					height: dimension.height,
					src: `http://localhost:8080/static/${ownerId}/${albumId}/${file.filename}`,
				};
				fileNames.push(fileObject);
			});
			await Photo.insertMany(fileNames, (error, photo) => {
				if (error) {
					console.log(error);
					throw new Error('Error in addMany methods in photo-service');
				} else {
					console.log('Photos upload');
				}
			});
			return fileNames;
		} catch (error) {
			console.log('Error in Photo service, method addMany');
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

	del = async function(id) {
		try {
			const photo = await this.getById(id);
			const newPath = await path.join(
				__dirname,
				'../',
				'/public',
				`${photo.ownerId}`,
				`${photo.albumId}`,
				`${photo.name}`
			);
			fs.unlink(newPath, error => {
				if (error) {
					throw new Error('Удалить photo не получилось :(');
				}
				console.log('Photo Удалено!');
			});
			await Photo.deleteOne({ _id: id });
		} catch (error) {
			console.log('Error in Photo service, method del');
			throw error;
		}
	};
	getAllPhotosByAlbumId = async function(albumId) {
		try {
			console.log(albumId);
			return await Photo.find({ albumId: albumId });
		} catch (error) {
			console.log('Error in Photo service, method getAllPhotosByAlbumId');
			throw error;
		}
	};
}

module.exports = PhotoService;
