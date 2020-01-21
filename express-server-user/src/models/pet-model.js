const { Schema, model } = require('mongoose');

const petSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	species: {
		type: String,
		required: true,
	},
	ownerId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});
const Pet = model('Pet', petSchema);
module.exports = Pet;
