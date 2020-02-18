const User = require('../models/user-model');
const Pets = require('../models/pet-model');
const mongoose = require('mongoose');

class UserService {
	constructor() {}

	add = async function(body) {
		const user = new User(body);
		try {
			await user.save();
			const token = await user.generateAuthToken();
			return { user, token };
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

	//!! сделать изменение пароля
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
			const user = await User.findById(id);
			if (!user) {
				throw new Error(`Пользователя с данным ID ${id}, не найдено!!!`);
			}
			return user;
			// return await User.findById(id);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	getUserPets = async function(id) {
		try {
			return await Pets.find({ ownerId: id }).select({
				_id: 1,
				name: 1,
				species: 1,
			});
		} catch (error) {
			console.log(error);
			return `Пользователя с данным ID ${id}, не найдено!!!`;
		}
	};

	getUserWithAllPets = async function(id) {
		try {
			return await User.aggregate([
				{
					$match: { _id: mongoose.Types.ObjectId(id) },
				},
				{
					$lookup: {
						from: 'pets',
						localField: '_id',
						foreignField: 'ownerId',
						as: 'pets',
					},
				},
			]);
		} catch (error) {
			console.log(error);
			return `Пользователя с данным ID ${id}, не найдено!!!`;
		}
	};

	del = async function(id) {
		try {
			await Pets.deleteMany({ ownerId: id });
			await User.deleteOne({ _id: id });
		} catch (error) {
			console.log(error);
		}
	};

	login = async function(login, password) {
		const user = await User.findByCredentials(login, password);
		const token = await user.generateAuthToken();
		return { user, token };
	};

	logout = async function(req) {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token;
		});
		await req.user.save();
	};
}

module.exports = UserService;
