const Pet = require('../models/pet-model');

class PetService {
	constructor() {}

	add = async function(body) {
		const pet = new Pet(body);
		try {
			await pet.save();
			return pet;
		} catch (error) {
			console.log('Error in Pet service, method add');
			throw error;
		}
	};

	get = async function() {
		try {
			return await Pet.find({}).populate('ownerId');
		} catch (error) {
			console.log('Error in Pet service, method get');
			throw error;
		}
	};

	update = async function(id, body) {
		try {
			return await Pet.findByIdAndUpdate(id, body);
		} catch (error) {
			console.log('Error in Pet service, method update');
			throw error;
		}
	};

	getById = async function(id) {
		try {
			return await Pet.findById(id).populate('ownerId');
		} catch (error) {
			console.log('Error in Pet service, method getById');
			throw error;
		}
	};

	del = async function(id) {
		try {
			await Pet.deleteOne({ _id: id });
		} catch (error) {
			console.log('Error in Pet service, method del');
			throw error;
		}
	};
}

module.exports = PetService;
