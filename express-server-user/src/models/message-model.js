const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
	{
		message: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		ownerId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		dialogId: {
			type: Schema.Types.ObjectId,
			ref: 'Dialog',
			required: true,
		},
	},
	{
		timestamps: { createdAt: 'createData', updatedAt: 'updateData' },
	}
);
const Message = model('Message', messageSchema);
module.exports = Message;
