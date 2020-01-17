const User = require('../models/user');
const Pets = require('../models/pet');
const mongoose = require('mongoose');

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
			const myId = '' + id;
			return await User.aggregate([
				{
					$lookup: {
						from: 'pets',
						localField: '_id',
						foreignField: 'ownerId',
						as: 'pets',
					},
				},
				{
					$match: { _id: mongoose.Types.ObjectId(id) },
				},
			]);
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
