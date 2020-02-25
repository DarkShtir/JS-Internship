const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		ownerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		albumId: {
			type: Schema.Types.ObjectId,
			ref: 'Album',
			required: true,
		},
		width: {
			type: Number,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: { createdAt: 'createData', updatedAt: 'updateData' },
	}
);
const Photo = model('Photo', photoSchema);
module.exports = Photo;
