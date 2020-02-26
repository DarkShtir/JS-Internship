const PhotoService = require('../services/photo-service');
const photo_service = new PhotoService();

class PhotoController {
	constructor() {}
	getPhoto = async (req, res) => {
		try {
			const result = await photo_service.get();
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	addPhoto = async (req, res) => {
		try {
			const result = await photo_service.add(
				req.file,
				req.body.ownerId,
				req.body.albumId
			);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	addManyPhoto = async (req, res) => {
		try {
			const result = await photo_service.addMany(
				req.files,
				req.body.ownerId,
				req.body.albumId
			);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	getPhotoId = async (req, res) => {
		try {
			const result = await photo_service.getById(req.params.id);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	updatePhoto = async (req, res) => {
		try {
			const result = await photo_service.update(req.params.id, req.body);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	deletePhoto = async (req, res) => {
		try {
			const result = await photo_service.del(req.params.id);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
}

module.exports = PhotoController;
