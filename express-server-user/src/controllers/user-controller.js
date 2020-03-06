const UserService = require('../services/user-service');
const user_service = new UserService();

class UserController {
	constructor() {}
	getUser = async (req, res) => {
		try {
			const result = await user_service.get(
				req.query.page,
				req.query.usersPerPage
			);
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	addUser = async (req, res) => {
		try {
			const result = await user_service.add(req.body);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	getUserId = async (req, res) => {
		try {
			const result = await user_service.getById(req.params.id);
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	getUserPets = async (req, res) => {
		try {
			const result = await user_service.getUserPets(req.params.id);
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	getUserWithAllPets = async (req, res) => {
		try {
			const result = await user_service.getUserWithAllPets(req.params.id);
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	updateUser = async (req, res) => {
		try {
			const result = await user_service.update(req.params.id, req.body);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	deleteUser = async (req, res) => {
		try {
			const result = await user_service.del(req.params.id);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	login = async (req, res) => {
		try {
			const result = await user_service.login(
				req.body.login,
				req.body.password
			);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	logout = async (req, res) => {
		try {
			await user_service.logout(req);
			res.send({ responce: 'successfully logout' });
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	getAllUserByName = async (req, res) => {
		try {
			const result = await user_service.getAllUserByName(req.query.name);
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
}
module.exports = UserController;
