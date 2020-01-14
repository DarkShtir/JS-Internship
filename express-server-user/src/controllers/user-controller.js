const UserService = require('../services/user-service');
const user_service = new UserService();

class UserController {
	constructor() {}
	getUser = async (req, res) => {
		try {
			const result = await user_service.get();
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
			const result = await user_service.getById(req);
			res.send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	updateUser = async (req, res) => {
		try {
			const result = await user_service.update(req);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
	deleteUser = async (req, res) => {
		try {
			const result = await user_service.del(req);
			res.status(201).send(result);
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};
}
module.exports = UserController;
