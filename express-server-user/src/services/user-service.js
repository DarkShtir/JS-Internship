const User = require('../models/user');

class UserService {
	constructor() {}

	add = async function(body) {
		const user = new User(body);
		try {
			await user.save();
			return user;
		} catch (error) {
			console.log(error);
			return `Не удалось добавить пользователя!`;
		}
	};

	get = async function() {
		try {
			return await User.find({});
		} catch (error) {
			console.log(error);
			return `Пользователей получить не удалось!`;
		}
	};

	update = async function(id, body) {
		try {
			return await User.findByIdAndUpdate(id, body);
		} catch (error) {
			console.log(error);
			return `Пользователя с данным ID ${id}, не найдено!!!`;
		}
	};

	getById = async function(id) {
		try {
			return await User.findById(id);
		} catch (error) {
			console.log(error);
			return `Пользователя с данным ID ${id}, не найдено!!!`;
		}
	};

	del = async function(id) {
		try {
			await User.deleteOne({ _id: id });
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = UserService;
