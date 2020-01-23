const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/dev.env' });

const userSchema = new Schema({
	login: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"');
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
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
	phone: {
		type: String,
	},
});

userSchema.statics.findByCredentials = async (login, password) => {
	const user = await User.findOne({ login });
	if (!user) {
		throw new Error('Unable user');
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
};

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		process.env.MY_BIG_SECRET_PHRASE
	);
	user.tokens = user.tokens.concat({ token });
	user.save();

	return token;
};

userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = model('User', userSchema);
module.exports = User;
