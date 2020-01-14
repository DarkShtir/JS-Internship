// const User = require('../models/user');

class UserService {
	constructor() {}
	add = async function(body) {
		const user = new User(body);
		await user.save();
		return { user };
	};

	get = async function() {
		return await User.find({});
	};

	update = async function(id, body) {
		return await User.findByIdAndUpdate(id, body);
	};

	getById = async function(id) {
		return await User.findById(id);
	};
}

module.exports = UserService;
