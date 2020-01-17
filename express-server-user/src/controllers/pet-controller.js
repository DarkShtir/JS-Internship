const PetService = require('../services/pet-service');
const pet_service = new PetService();

class PetController {
	constructor() {}
	getPet = async (req, res) => {
		try {
			const result = await pet_service.get();
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	addPet = async (req, res) => {
		try {
			const result = await pet_service.add(req.body);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	getPetId = async (req, res) => {
		try {
			const result = await pet_service.getById(req.params.id);
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	updatePet = async (req, res) => {
		try {
			const result = await pet_service.update(req.params.id, req.body);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	deletePet = async (req, res) => {
		try {
			const result = await pet_service.del(req.params.id);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
}
module.exports = PetController;
