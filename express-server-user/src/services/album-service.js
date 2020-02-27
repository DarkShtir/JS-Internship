const fs = require('fs-extra');
const path = require('path');

const Album = require('../models/album-model');
const Photo = require('../models/photo-model');

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
			return album;
		} catch (error) {
			console.log('Error in Album service, method getById');
			throw error;
		}
	};

	del = async function(id) {
		try {
			const album = await this.getById(id);
			const newPath = await path.join(
				__dirname,
				'../',
				'/public',
				`${album.ownerId}`,
				`${id}`
			);
			fs.remove(newPath, error => {
				if (error) {
					throw new Error('Удалить album не получилось :(');
				}
				console.log('Album Удален!');
			});
			await Photo.deleteMany({ albumId: id });
			await Album.deleteOne({ _id: id });
		} catch (error) {
			console.log('Error in Album service, method del');
			throw error;
		}
	};

	getAllAlbumsByUserId = async function(id) {
		try {
			return await Album.find({ ownerId: id });
		} catch (error) {
			console.log('Error in Album service, method getAllAlbumsByUserId');
			throw error;
		}
	};
}

module.exports = AlbumService;
