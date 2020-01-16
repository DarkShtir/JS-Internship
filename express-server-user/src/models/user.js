const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	gender: {
		type: String,
		required: true,
	},
	title: {
		type: String,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	nat: {
		type: String,
		required: true,
	},
});

module.exports = model('User', userSchema);
