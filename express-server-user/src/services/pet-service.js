const Pet = require('../models/pet');

class PetService {
	constructor() {}

	add = async function(body) {
		const pet = new Pet(body);
		try {
			await pet.save();
			return pet;
		} catch (error) {
			console.log(error);
			return `Не удалось добавить пользователя!`;
		}
	};

	get = async function() {
		try {
			return await Pet.find({}).populate('ownerId');
		} catch (error) {
			console.log(error);
			return `Пользователей получить не удалось!`;
		}
	};

	update = async function(id, body) {
		try {
			return await Pet.findByIdAndUpdate(id, body);
		} catch (error) {
			console.log(error);
			return `Пользователя с данным ID ${id}, не найдено!!!`;
		}
	};

	getById = async function(id) {
		try {
			return await Pet.findById(id).populate('ownerId');
		} catch (error) {
			console.log(error);
			return `Пользователя с данным ID ${id}, не найдено!!!`;
		}
	};

	del = async function(id) {
		try {
			await Pet.deleteOne({ _id: id });
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = PetService;
