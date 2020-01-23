const Joi = require('@hapi/joi');

const schema = Joi.object({
	name: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),

	species: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	ownerId: Joi.string()
		.alphanum()
		.min(20)
		.max(30)
		.required(),
});
// .with('login', 'gender', 'title', 'firstName', 'lastName', 'nat', 'phone')
// .xor('password', 'tokens')
// .with('password', 'repeat_password');

module.exports = schema;