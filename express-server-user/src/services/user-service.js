// const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const UserModel = require('../models/user');
const user_model = new UserModel();

class UserService {
	constructor() {
		this.arrUsers = [];
		this.user;
		this.myPath;
	}
	myPath = path.join(__dirname, '..', 'db', 'user-db.json');

	add = async function(body) {
		let newArr;
		if (this.arrUsers.length === 0) {
			this.get();
		}
		newArr = user_model.add(this.arrUsers, body);
		fs.writeFile(this.myPath, newArr, err => {
			console.log(err);
		});
	};

	get = async function() {
		if (this.arrUsers.length === 0) {
			this.arrUsers = JSON.parse(fs.readFileSync(this.myPath));
		}
		return await this.arrUsers;
	};

	update = async function(id, body) {
		let newArr;
		if (this.arrUsers.length === 0) {
			this.get();
		}
		newArr = user_model.update(this.arrUsers, id, body);
		fs.writeFile(this.myPath, newArr, err => {
			console.log(err);
		});
		// return await User.findByIdAndUpdate(id, body);
	};

	getById = async function(id) {
		if (this.arrUsers.length === 0) {
			this.get();
		}
		return await user_model.getById(this.arrUsers, id);
	};
	del = async function(id) {
		if (this.arrUsers.length === 0) {
			this.get();
		}

		this.arrUsers = user_model.del(this.arrUsers, id);
		fs.writeFile(this.myPath, this.arrUsers, err => {
			console.log(err);
		});
		// return await User.findById(id);
	};
}

module.exports = UserService;
