const { Schema, model } = require('mongoose');

const dialogSchema = new Schema(
	{
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		],
	},
	{
		timestamps: { createdAt: 'createData', updatedAt: 'updateData' },
	}
);
const Dialog = model('Dialog', dialogSchema);
module.exports = Dialog;
