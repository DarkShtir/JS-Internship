const AlbumService = require('../services/album-service');
const album_service = new AlbumService();

class AlbumController {
	constructor() {}
	getAlbum = async (req, res) => {
		try {
			const result = await album_service.get();
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	getAllAlbumsByUserId = async (req, res) => {
		try {
			const result = await album_service.getAllAlbumsByUserId(req.params.id);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	addAlbum = async (req, res) => {
		try {
			const result = await album_service.add(req.body);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	getAlbumId = async (req, res) => {
		try {
			const result = await album_service.getById(req.params.id);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	updateAlbum = async (req, res) => {
		try {
			const result = await album_service.update(req.params.id, req.body);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	deleteAlbum = async (req, res) => {
		try {
			const result = await album_service.del(req.params.id);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
}

module.exports = AlbumController;
