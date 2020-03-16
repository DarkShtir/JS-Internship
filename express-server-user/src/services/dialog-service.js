const Dialog = require('../models/dialog-model');
const Message = require('../models/message-model');
const mongoose = require('mongoose');

class DialogService {
	constructor() {}

	create = async function(body) {
		const dialog = new Dialog(body);
		try {
			// console.log('dialog', dialog);
			await dialog.save();
			return dialog;
		} catch (error) {
			console.log('Error in Dialog service, method create');
			throw error;
		}
	};

	getById = async function(id) {
		try {
			const dialog = await Dialog.findById(id);
			if (!dialog) {
				throw new Error(`Диалога с данным ID ${id}, не найдено!!!`);
			}
			return dialog;
		} catch (error) {
			console.log('Error in Dialog service, method getById');
			throw error;
		}
	};
	// getDialogsByUserId = async function(id) {
	// 	try {
	// 		const dialog = await Dialog.find({ members: id });
	// 		if (!dialog) {
	// 			throw new Error(`Диалога с данным ID ${id}, не найдено!!!`);
	// 		}
	// 		return dialog;
	// 	} catch (error) {
	// 		console.log('Error in Dialog service, method getById');
	// 		throw error;
	// 	}
	// };
	getDialogsByUserId = async function(id) {
		try {
			// const dialog = await Dialog.find({ members: id });
			const dialog = await Dialog.aggregate([
				{
					$match: {
						members: mongoose.Types.ObjectId(id),
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'members',
						foreignField: '_id',
						as: 'members',
					},
				},
			]);
			if (!dialog) {
				throw new Error(`Диалога с данным ID ${id}, не найдено!!!`);
			}
			return dialog;
		} catch (error) {
			console.log('Error in Dialog service, method getDialogsByUserId');
			throw error;
		}
	};
	getDialogByMembersId = async function(firstId, secondId) {
		try {
			// const dialog = await Dialog.findOne({ members: [firstId, secondId] });

			const newDialog = await Dialog.aggregate([
				{
					$match: {
						members: {
							$all: [
								mongoose.Types.ObjectId(firstId),
								mongoose.Types.ObjectId(secondId),
							],
							$size: 2,
						},
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'members',
						foreignField: '_id',
						as: 'members',
					},
				},
			]);
			return newDialog;
		} catch (error) {
			console.log('Error in Dialog service, method getDialogByMembersId');
			throw error;
		}
	};
	getMessagesByDialogId = async function(dialogId) {
		try {
			// console.log(dialogId);
			const messages = await Message.find({ dialogId: dialogId });
			return messages;
		} catch (error) {
			console.log('Error in Dialog service, method getMessagesByDialogId');
			throw error;
		}
	};
}

module.exports = DialogService;
