class User {
	constructor() {}
	add(arr, body) {
		arr.push(body);
		return JSON.stringify(arr, null, '	');
	}
	update(arr, id, body) {
		let isUpdate = false;
		arr.forEach(element => {
			for (const key in element) {
				if (key === 'id' && element[key] === id) {
					element = Object.assign(element, body);
					isUpdate = true;
				}
			}
		});
		if (isUpdate === false) {
			throw new Error(`Пользователя с данным ID = ${id} не найдено`);
		}
		return JSON.stringify(arr, null, '	');
	}
	getById(arr, id) {
		let user;
		arr.forEach(element => {
			for (const key in element) {
				if (key === 'id' && element[key] === id) {
					user = element;
				}
			}
		});
		if (user === undefined) {
			throw new Error(`Пользователя с данным ID = ${id} не найдено`);
		}
		return user;
	}
	del(arr, id) {
		let newArr = [];
		arr.forEach(element => {
			for (const key in element) {
				if (key === 'id' && element[key] !== id) {
					newArr.push(element);
				}
			}
		});
		if (newArr.length === arr.length) {
			throw new Error(
				`Пользователя с данным ID = ${id} не найдено, Возвращаю изначальный массив!`
			);
		}
		return JSON.stringify(newArr, null, '	');
	}
}

module.exports = User;
