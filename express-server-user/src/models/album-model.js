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
		description: {
			type: String,
			default: 'Описания альбома пока нету, но скоро появится!',
		},
		privateAlbum: {
			type: Boolean,
			default: true,
		},
		previewUrl: {
			type: String,
			default: 'http://localhost:8080/static/default_album-1582707016442.svg',
		},
	},
	{
		timestamps: { createdAt: 'createData', updatedAt: 'updateData' },
	}
);
const Album = model('Album', albumSchema);
module.exports = Album;
