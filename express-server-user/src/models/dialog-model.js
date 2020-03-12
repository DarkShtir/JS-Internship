const { Schema, model } = require('mongoose');

const dialogSchema = new Schema(
	{
		members: {
			type: [],
			required: true,
		},
	},
	{
		timestamps: { createdAt: 'createData', updatedAt: 'updateData' },
	}
);
const Dialog = model('Dialog', dialogSchema);
module.exports = Dialog;
