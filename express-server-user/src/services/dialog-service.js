const Dialog = require('../models/dialog-model');

class DialogService {
	constructor() {}

	create = async function(body) {
		const dialog = new Dialog(body);
		try {
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
			const dialog = await Dialog.find({ members: id });
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
			const dialog = await Dialog.findOne({ members: [firstId, secondId] });
			// console.log(dialog);
			// if (!dialog) {
			// 	throw new Error(`Диалога c данными пользователями, не найдено!!!`);
			// }
			return dialog;
		} catch (error) {
			console.log('Error in Dialog service, method getDialogByMembersId');
			throw error;
		}
	};
}

module.exports = DialogService;
