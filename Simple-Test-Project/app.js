import { task } from './taskArr.js';
const taskArr = task;
class EventEmmiter {
	constructor() {
		this.events = {};
	}
	on(event, listener) {
		(this.events[event] || (this.events[event] = [])).push(listener);
		return this;
	}
	emitter(event, arg) {
		(this.events[event] || []).slice().forEach(lsn => lsn(arg));
	}
}
class User {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.level = 0;
		this.amountTrueAnswers = 0;
	}
	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
	setLevel(level) {
		if (level === 'EASY') {
			this.level = 1;
		} else if (level === 'MEDIUM') {
			this.level = 2;
		} else if (level === 'HARD') {
			this.level = 3;
		}
	}
	getLevel() {
		return this.level;
	}
}

class Task {
	constructor(level, question, countAnswers) {
		this.level = level;
		this.question = question;
		this.countAnswers = countAnswers;
		this.answersArr = [];
		this.rightAnswer;
	}
}

class Model extends EventEmmiter {
	constructor() {
		super();
		this.userArr = [];
		this.arrOfQuestion = [];
		self = this;
	}
	createNewUser(firstName = 'Неизвестный', lastName = 'Опоссум', level) {
		const newUser = new User(firstName, lastName);
		newUser.setLevel(level);
		this.userArr.unshift(newUser);
	}
	createArrOfQuestion() {
		taskArr.forEach(element => {
			if (this.userArr[0].getLevel() === element.level) {
				this.arrOfQuestion.push(element);
			}
		});
		this.arrOfQuestion = this.shuffle(this.arrOfQuestion);
	}
	checkAnswer(answer, numQuestion) {
		if (answer == this.arrOfQuestion[numQuestion - 1].rightAnswer) {
			this.userArr[0].amountTrueAnswers++;
			this.emitter('trueAnswer', answer);
		} else {
			this.emitter('falseAnswer', answer);
			this.emitter(
				'trueAnswer',
				this.arrOfQuestion[numQuestion - 1].rightAnswer
			);
		}
	}
	getQuestion(obj) {
		return obj.question;
	}
	getAnswers(obj) {
		return obj.answersArr;
	}
	getRightAnswer(obj) {
		return obj.rightAnswer;
	}

	shuffle(arr) {
		let j, temp;
		for (var i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			temp = arr[j];
			arr[j] = arr[i];
			arr[i] = temp;
		}
		return arr;
	}
}

class Controller extends EventEmmiter {
	constructor(model, view) {
		super();
		this.model = model;
		this.view = view;
		this.amountQuestions = 0;
		this.numberQuestion = 0;
		this.amountGames = 0;
		model.on('trueAnswer', answer => {
			this.trueAnswer(answer);
		});
		model.on('falseAnswer', answer => {
			this.falseAnswer(answer);
		});
	}
	start() {
		if (this.numberQuestion === 0 && this.amountGames === 0) {
			this.createNewUserListener();
			this.createAndControlQuestionForm();
		} else {
			this.model.arrOfQuestion = [];
		}
	}
	createNewUserListener() {
		let formBtn = document.querySelector('.form-login');
		formBtn.addEventListener('click', e => {
			e.preventDefault();
			if (e.target.tagName === 'BUTTON') {
				this.createNewUser();
			}
		});
	}
	createAndControlQuestionForm() {
		let questionBtn = document.querySelector('.form-test');
		questionBtn.addEventListener('click', e => {
			this.listenerQuestionForm(e);
		});
	}
	listenerQuestionForm(e) {
		e.preventDefault();
		let answerBtn = document.querySelectorAll('.answer-btn');
		answerBtn.forEach((value, index) => {
			if (
				value.classList.contains(`answer-${index + 1}`) ===
				e.target.classList.contains(`answer-${index + 1}`)
			) {
				this.model.checkAnswer(
					e.target.textContent,
					this.numberQuestion
				);
			}
		});
		if (e.target.classList.contains('next')) {
			this.renderQuestion(this.numberQuestion);
			console.log('Теперь ты нажимаешь на клавишу СЛЕДУЮЩИЙ ВОПРОС');
		}
	}
	createNewUser() {
		let firstName = document.querySelector('#firstName').value;
		if (firstName === '') {
			firstName = 'Неопознанный';
		}
		let lastName = document.querySelector('#lastName').value;
		if (lastName === '') {
			lastName = 'Опоссум';
		}
		let level = document.querySelector('#level').value;
		this.model.createNewUser(firstName, lastName, level);
		this.createQuestion();
	}
	createQuestion() {
		this.model.createArrOfQuestion();
		this.view.toggleFormVisibility();
		this.view.toggleQuestionVisibility();
		this.getAmountQuestions();
		this.renderQuestion(this.numberQuestion);
	}
	getAmountQuestions() {
		this.amountQuestions = this.model.arrOfQuestion.length;
	}
	renderQuestion(num) {
		if (num < this.amountQuestions) {
			this.view.setQuestion(this.model.arrOfQuestion[num].question);
			this.view.setAnswer(
				this.model.shuffle(this.model.arrOfQuestion[num].answersArr)
			);
			this.numberQuestion++;
			console.log(this.numberQuestion);
			this.view.enableBtn();
		} else {
			this.finishGame();
		}
	}
	finishGame() {
		let right = this.model.userArr[0].amountTrueAnswers;
		let points = (right * 100) / this.amountQuestions;
		let fullName = this.model.userArr[0].getFullName();
		this.view.finishGame(fullName, points);
		this.newGame();
	}
	newGame() {
		if (this.amountGames === 0) {
			let newGameBtn = document.querySelector('.finish-game');
			newGameBtn.addEventListener('click', e => {
				e.preventDefault();
				if (e.target.classList.contains('new-game-btn')) {
					this.amountGames++;
					this.numberQuestion = 0;
					this.amountQuestions = 0;
					this.view.newGame();
					this.start();
				}
			});
		}
	}
	trueAnswer(answer) {
		let btn = document.querySelectorAll('.answer-btn');
		btn.forEach((element, index) => {
			if (element.textContent === answer) {
				this.view.trueAnswer(index + 1);
			}
		});
		this.view.nextQuestion();
		this.view.disableBtn();
	}
	falseAnswer(answer) {
		let btn = document.querySelectorAll('.answer-btn');
		btn.forEach((element, index) => {
			if (element.textContent === answer) {
				this.view.falseAnswer(index + 1);
			}
		});
	}
}

class View {
	constructor() {}
	setQuestion(question) {
		let questionDiv = document.querySelector('.question');
		questionDiv.textContent = question;
	}
	setAnswer(answers) {
		answers.forEach((element, index) => {
			let answerBtn = document.querySelector(`.answer-${index + 1}`);
			answerBtn.classList.remove('button-success');
			answerBtn.classList.remove('button-error');
			let nextBtn = document.querySelector('.next');
			nextBtn.classList.remove('button-warning');
			nextBtn.classList.add('pure-button-disabled');
			answerBtn.textContent = element;
		});
	}
	trueAnswer(index) {
		document
			.querySelector(`.answer-${index}`)
			.classList.add('button-success');
	}
	falseAnswer(index) {
		document
			.querySelector(`.answer-${index}`)
			.classList.add('button-error');
	}
	disableBtn() {
		let answerBtn = document.querySelectorAll('.answer-btn');
		answerBtn.forEach(value => {
			value.classList.add('pure-button-disabled');
		});
	}
	enableBtn() {
		let answerBtn = document.querySelectorAll('.answer-btn');
		answerBtn.forEach(value => {
			value.classList.remove('pure-button-disabled');
		});
	}
	nextQuestion() {
		let nextBtn = document.querySelector('.next');
		nextBtn.classList.add('button-warning');
		nextBtn.classList.remove('pure-button-disabled');
	}
	finishGame(fullName, points) {
		this.toggleFinishFormVisibility();
		this.toggleQuestionVisibility();
		let finishForm = document.querySelector('.finish-form');
		finishForm.textContent = `Пользователь ${fullName} правильно ответил на ${points}% вопросов!`;
	}
	newGame() {
		this.toggleFinishFormVisibility();
		this.toggleFormVisibility();
	}
	toggleFinishFormVisibility() {
		let finishForm = document.querySelector('.finish-form');
		let newGameBtn = document.querySelector('.new-game-btn');
		finishForm.classList.toggle('hidden');
		newGameBtn.classList.toggle('hidden');
	}
	toggleFormVisibility() {
		document.querySelector('.form-login').classList.toggle('hidden');
	}
	toggleQuestionVisibility() {
		document.querySelector('.form-test').classList.toggle('hidden');
	}
	// hiddenForm() {
	// 	document.querySelector('.form-login').classList.add('hidden');
	// }
	// showQuestion() {
	// 	document.querySelector('.form-test').classList.remove('hidden');
	// }
	// hiddenQuestion() {
	// 	document.querySelector('.form-test').classList.add('hidden');
	// }
}
const view = new View();
const model = new Model();
const controller = new Controller(model, view);
controller.start();
