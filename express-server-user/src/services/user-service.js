// const User = require('../models/user');
const fs = require('fs');
const path = require('path');

class UserService {
	constructor() {
		this.arrUsers = [];
		this.user;
	}
	add = async function(body) {
		let newArr;
		if (this.arrUsers.length === 0) {
			let myPath = path.join('src', 'db', 'user-db.json');
			this.arrUsers = JSON.parse(fs.readFileSync(myPath));
			this.arrUsers.push(body);
			newArr = JSON.stringify(this.arrUsers, null, ' ');
			fs.writeFile(myPath, newArr, err => {
				console.log(err);
			});
		} else {
			this.arrUsers.push(body);
			console.log(this.arrUsers);
			newArr = JSON.stringify(this.arrUsers, null, ' ');
			fs.writeFile(myPath, newArr, err => {
				console.log(err);
			});
		}

		// let myPath = path.join('src', 'db', 'user-db.json');
		// let newBody = JSON.stringify(body);

		// const user = new User(body);
		// await user.save();
		// return { user };
		console.log('Сработал ADD запрос');
	};

	get = async function() {
		let myPath = path.join('src', 'db', 'user-db.json');
		this.arrUsers = JSON.parse(fs.readFileSync(myPath));
		// fs.readFile(myPath, 'utf-8', (err, data) => {
		// 	// if (err) throw err;
		// 	this.arrUsers = JSON.parse(data);
		// });
		return await this.arrUsers;
	};

	update = async function(id, body) {
		let newArr;
		let myPath = path.join('src', 'db', 'user-db.json');
		if (this.arrUsers.length === 0) {
			this.get();
			this.arrUsers.forEach(element => {
				for (const key in element) {
					if (key === 'id' && element[key] === id) {
						element = Object.assign(element, body);
					}
				}
			});
			newArr = JSON.stringify(this.arrUsers, null, ' ');
			fs.writeFile(myPath, newArr, err => {
				console.log(err);
			});
		} else {
			this.arrUsers.forEach(element => {
				for (const key in element) {
					if (key === 'id' && element[key] === id) {
						element = Object.assign(element, body);
					}
				}
			});
			newArr = JSON.stringify(this.arrUsers, null, ' ');
			fs.writeFile(myPath, newArr, err => {
				console.log(err);
			});
		}
		// return await User.findByIdAndUpdate(id, body);
		console.log('Сработал PUT запрос');
	};

	getById = async function(id) {
		if (this.arrUsers.length === 0) {
			this.get();
			this.arrUsers.forEach(element => {
				for (const key in element) {
					if (key === 'id' && element[key] === id) {
						this.user = element;
					}
				}
			});
		} else {
			this.arrUsers.forEach(element => {
				for (const key in element) {
					if (key === 'id' && element[key] === id) {
						this.user = element;
					}
				}
			});
		}
		return await this.user;
		// return await User.findById(id);
	};
}

module.exports = UserService;
