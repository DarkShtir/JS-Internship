const Joi = require('@hapi/joi');

const schema = Joi.object({
	login: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),

	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

	repeat_password: Joi.ref('password'),

	tokens: [Joi.string(), Joi.number()],

	gender: Joi.string().required(),

	title: Joi.string(),

	firstName: Joi.string().required(),

	lastName: Joi.string().required(),

	nat: Joi.string().required(),

	phone: Joi.string().pattern(
		new RegExp(
			'^(375(29|33|25|44)|\\+375(29|33|25|44)|8\\s\\(0(29|33|25|44)\\)\\s)[1-9]{1}([0-9]{6}|[0-9]{2}-[0-9]{2}-[0-9]{2})$'
		)
	),
});
// .with('login', 'gender', 'title', 'firstName', 'lastName', 'nat', 'phone')
// .xor('password', 'tokens')
// .with('password', 'repeat_password');

module.exports = schema;
