const { Schema, model } = require('mongoose');

const albumSchema = new Schema(
	{
		name: {
			type: String,
			default: 'New Album',
		},
		ownerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		discription: {
			type: String,
			default: 'Описания альбома пока нету, но скоро появится!',
		},
	},
	{
		timestamps: { createdAt: 'createData', updatedAt: 'updateData' },
	}
);
const Album = model('Album', albumSchema);
module.exports = Album;
