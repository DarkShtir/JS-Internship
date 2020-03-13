const DialogService = require('../services/dialog-service');
const dialog_service = new DialogService();

class DialogController {
	constructor() {}
	createDialog = async (req, res) => {
		try {
			const result = await dialog_service.create(req.body);
			res.status(201).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	getDialogById = async (req, res) => {
		try {
			const result = await dialog_service.getById(req.params.id);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	getDialogsByUserId = async (req, res) => {
		try {
			const result = await dialog_service.getDialogsByUserId(req.params.userId);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	getDialogByMembersId = async (req, res) => {
		try {
			const result = await dialog_service.getDialogByMembersId(
				req.query.firstId,
				req.query.secondId
			);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
	getMessagesByDialogId = async (req, res) => {
		try {
			console.log('controller', req.query.dialogId);
			const result = await dialog_service.getMessagesByDialogId(
				req.query.dialogId
			);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	};
}

module.exports = DialogController;
