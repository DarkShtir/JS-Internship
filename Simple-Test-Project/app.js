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
const taskArr = [
	{
		level: 1,
		question:
			'У мамы Альфреда четверо детей. Девочек зовут Эйприл, Джун и Джули. Как зовут сына?',
		countAnswers: 4,
		answersArr: ['Альфред', 'Август', 'Марк', 'Джимми'],
		rightAnswer: 'Альфред',
	},
	{
		level: 1,
		question:
			'Меня называют золотым и я уместен в неловких ситуациях. Если ты меня назовешь, я исчезну. Кто я?',
		countAnswers: 4,
		answersArr: ['Слово', 'Сокровище', 'Молчание', 'Домашний лес'],
		rightAnswer: 'Молчание',
	},
	{
		level: 1,
		question:
			'Я сильнее, чем Чак Норрис, я злее черта, у бедняков я есть, богатые во мне нуждаются. Если ты будешь меня есть, ты умрешь. Кто я?',
		countAnswers: 4,
		answersArr: ['Ничто', 'Долг', 'Ураган', 'Камень'],
		rightAnswer: 'Ничто',
	},
	{
		level: 1,
		question:
			'Человек, который его делает, делает его не для себя. Человек, который его покупает, в нем не нуждается. Тот, кто будет им пользоваться, не узнает об этом. О чем речь?',
		countAnswers: 4,
		answersArr: ['Гроб', 'Wi-Fi', 'Татуировка', 'Свадебное платье'],
		rightAnswer: 'Гроб',
	},
	{
		level: 1,
		question:
			'Внутри зеленого дома - белый дом. Внутри белого дома - красный дом. Внутри красного дома - множество деток. Что это?',
		countAnswers: 4,
		answersArr: ['Госпиталь', 'Детский сад', 'Теплица', 'Арбуз'],
		rightAnswer: 'Арбуз',
	},
	{
		level: 1,
		question:
			'По сколько штук каждого вида животных Моисей взял с собой в ковчег?',
		countAnswers: 4,
		answersArr: [
			'Неисчислимое множество',
			'Нисколько',
			'Каждой твари по паре',
			'По три штуки',
		],
		rightAnswer: 'Каждой твари по паре',
	},
	{
		level: 1,
		question: 'Что ты можешь поймать, но не можешь  бросить?',
		countAnswers: 4,
		answersArr: ['Футбольный мяч', 'Друга/Подругу', 'Фрисби', 'Простуду'],
		rightAnswer: 'Простуду',
	},
	{
		level: 1,
		question: 'Почему белые медведи не едят пингвинов?',
		countAnswers: 4,
		answersArr: [
			'Не нравится вкус',
			'Медведи-пацифисты',
			'Они никогда не встречаются',
			'Пингвины быстро бегают',
		],
		rightAnswer: 'Они никогда не встречаются',
	},
	{
		level: 2,
		question: 'Какой формы Земля? Вопрос с подвохом',
		countAnswers: 4,
		answersArr: ['Диск', 'Круг', 'Геоид', 'Шар'],
		rightAnswer: 'Геоид',
	},
	{
		level: 2,
		question: 'Из чего состоят облака?',
		countAnswers: 4,
		answersArr: [
			'Из капель воды и кристалов льда',
			'Из смеси газов',
			'Из ваты',
			'Из пыли',
		],
		rightAnswer: 'Из капель воды и кристалов льда',
	},
	{
		level: 2,
		question: 'Что такое картофель? Не торопитесь с ответом',
		countAnswers: 4,
		answersArr: ['Клубнеплод', 'Корнеплод', 'Фрукт', 'Ягода'],
		rightAnswer: 'Клубнеплод',
	},
	{
		level: 2,
		question: 'Почему дует ветер?',
		countAnswers: 4,
		answersArr: [
			'Потому что деревья качаются',
			'Из-за космических процессов',
			'Потому что Земля вертится',
			'Из-за разницы в атмосферном давлении',
		],
		rightAnswer: 'Из-за разницы в атмосферном давлении',
	},
	{
		level: 2,
		question: 'Самая высокая гора — это…',
		countAnswers: 4,
		answersArr: ['Килиманджаро', 'Аконкагуа', 'Эльбрус', 'Эверест'],
		rightAnswer: 'Эверест',
	},
	{
		level: 2,
		question: 'Где живут пингвины?',
		countAnswers: 4,
		answersArr: ['Арктика', 'Гренландия', 'Россия', 'Антарктида'],
		rightAnswer: 'Антарктида',
	},
	{
		level: 2,
		question:
			'Как у растений называется процесс образования питательных веществ с помощью энергии света?',
		countAnswers: 4,
		answersArr: [
			'Люминесценция',
			'Фотосинтез',
			'Соляризация',
			'Флуоресценция',
		],
		rightAnswer: 'Фотосинтез',
	},
	{
		level: 2,
		question: 'Что представляет собой зрачок?',
		countAnswers: 4,
		answersArr: [
			'Стекловидное тело',
			'Слепое пятно',
			'Пигментное пятно на радужке',
			'Отверстие в радужной оболочке глаза',
		],
		rightAnswer: 'Отверстие в радужной оболочке глаза',
	},
	{
		level: 2,
		question: 'Почему при болезни повышается температура?',
		countAnswers: 4,
		answersArr: [
			'Так действует вирус',
			'Крови становится больше',
			'Организм борется с вирусом',
			'От потери сил',
		],
		rightAnswer: 'Организм борется с вирусом',
	},
	{
		level: 2,
		question:
			'А что происходит при повышении температуры тела до 42 градусов?',
		countAnswers: 4,
		answersArr: [
			'Сворачивается белок',
			'Закипает кровь',
			'Останавливается сердце',
			'Лопаются глаза',
		],
		rightAnswer: 'Сворачивается белок',
	},
	{
		level: 3,
		question: 'Кто был вторым человеком на Луне?',
		countAnswers: 4,
		answersArr: [
			'Нил Армстронг',
			'Юрий Гагарин',
			'Базз Олдрин',
			'Джон Ленон',
		],
		rightAnswer: 'Базз Олдрин',
	},
	{
		level: 3,
		question: 'Энтомология — это наука, которая изучает:',
		countAnswers: 4,
		answersArr: ['Культуры', 'Общество', 'Преступность', 'Насекомых'],
		rightAnswer: 'Насекомых',
	},
	{
		level: 3,
		question: 'Эритрея — это страна в:',
		countAnswers: 4,
		answersArr: ['Африке', 'Европе', 'Америках', 'Азии'],
		rightAnswer: 'Африке',
	},
	{
		level: 3,
		question: 'Какая религия самая многочисленная в мире?',
		countAnswers: 4,
		answersArr: ['Христианство', 'Ислам', 'Буддизм', 'Индуизм'],
		rightAnswer: 'Христианство',
	},
	{
		level: 3,
		question: 'Туба относится к _________ инструментам.',
		countAnswers: 4,
		answersArr: ['Духовым', 'Щипковым', 'Клавишным', 'Смычковым'],
		rightAnswer: 'Духовым',
	},
	{
		level: 3,
		question: 'Где находится Стоунхендж?',
		countAnswers: 4,
		answersArr: ['В Австралии', 'В Англии', 'В Германии', 'В Норвегии'],
		rightAnswer: 'В Англии',
	},
	{
		level: 3,
		question: 'Лошадь живёт _____ лет.',
		countAnswers: 4,
		answersArr: ['25-30', '35-40', '5-10', '45-50'],
		rightAnswer: '25-30',
	},
	{
		level: 3,
		question: 'Древние индуистские писания написаны на:',
		countAnswers: 4,
		answersArr: ['Фарси', 'Санскрите', 'Иврите', 'Руничиском языке'],
		rightAnswer: 'Санскрите',
	},
	{
		level: 3,
		question: 'Какой самый маленький в мире океан?',
		countAnswers: 4,
		answersArr: [
			'Северный Ледовитый океан',
			'Индийский океан',
			'Тихий океан',
			'Атлантический',
		],
		rightAnswer: 'Северный Ледовитый океан',
	},
	{
		level: 3,
		question: 'Пабло Пикассо был:',
		countAnswers: 4,
		answersArr: ['Мексиканцем', 'Бразильцем', 'Испанцем', 'Индусом'],
		rightAnswer: 'Испанцем',
	},
];

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
	createQuestion() {
		this.model.createArrOfQuestion();
		console.log('запустился Метод создания Вопросов МОДЕЛЬ');
		this.view.toggleFormVisibility();
		this.view.toggleQuestionVisibility();
		console.log('Переключилась видимость Форм');
		this.getAmountQuestions();
		console.log('получено количество вопросов');
		this.renderQuestion(this.numberQuestion);
		console.log('вопросы рендярятся');
	}
	createNewUserListener() {
		console.log('запустился Метод создания Юзера КОНТРОЛЛЕР');
		let formBtn = document.querySelector('.form-login');
		formBtn.addEventListener('click', e => {
			e.preventDefault();
			if (e.target.tagName === 'BUTTON') {
				this.createNewUser();
			}
		});
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
		console.log('запустился Метод создания Юзера МОДЕЛЬ');
		this.createQuestion();
	}

	createAndControlQuestionForm() {
		let questionBtn = document.querySelector('.form-test');
		questionBtn.addEventListener('click', e => {
			this.listenerQuestionForm(e);
		});
		// questionBtn.addEventListener('click', e => {
		// 	e.preventDefault();
		// 	if (e.target.classList.contains('answer-1')) {
		// 		this.model.checkAnswer(
		// 			e.target.textContent,
		// 			this.numberQuestion
		// 		);
		// 	} else if (e.target.classList.contains('answer-2')) {
		// 		this.model.checkAnswer(
		// 			e.target.textContent,
		// 			this.numberQuestion
		// 		);
		// 	} else if (e.target.classList.contains('answer-3')) {
		// 		this.model.checkAnswer(
		// 			e.target.textContent,
		// 			this.numberQuestion
		// 		);
		// 	} else if (e.target.classList.contains('answer-4')) {
		// 		this.model.checkAnswer(
		// 			e.target.textContent,
		// 			this.numberQuestion
		// 		);
		// 	} else if (e.target.classList.contains('next')) {
		// 		this.renderQuestion(this.numberQuestion);
		// 		console.log('Теперь ты нажимаешь на клавишу СЛЕДУЮЩИЙ ВОПРОС');
		// 	}
		// });
	}
	listenerQuestionForm(e) {
		e.preventDefault();
		if (e.target.classList.contains('answer-1')) {
			this.model.checkAnswer(e.target.textContent, this.numberQuestion);
		} else if (e.target.classList.contains('answer-2')) {
			this.model.checkAnswer(e.target.textContent, this.numberQuestion);
		} else if (e.target.classList.contains('answer-3')) {
			this.model.checkAnswer(e.target.textContent, this.numberQuestion);
		} else if (e.target.classList.contains('answer-4')) {
			this.model.checkAnswer(e.target.textContent, this.numberQuestion);
		} else if (e.target.classList.contains('next')) {
			this.renderQuestion(this.numberQuestion);
			console.log('Теперь ты нажимаешь на клавишу СЛЕДУЮЩИЙ ВОПРОС');
		}
	}
	newGame() {
		if (this.amountGames === 0) {
			let newGameBtn = document.querySelector('.finish-game');
			newGameBtn.addEventListener('click', e => {
				e.preventDefault();
				if (e.target.classList.contains('new-game-btn')) {
					// location.reload(true);
					// console.log('Нажал клавишу новая игра');
					this.amountGames++;
					this.numberQuestion = 0;
					this.amountQuestions = 0;
					this.view.newGame();
					// this.removeEventListenerFromQuestionForm();
					this.start();
				}
			});
		}
	}
	// removeEventListenerFromQuestionForm() {
	// 	let questionBtn = document.querySelector('.form-test');
	// 	questionBtn.removeEventListener('click', e => {
	// 		this.listenerQuestionForm(e);
	// 	});
	// }
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
	trueAnswer(answer) {
		let btn = document.querySelectorAll('.answer-btn');
		btn.forEach((element, index) => {
			if (element.textContent === answer) {
				this.view.trueAnswer(index + 1);
			}
		});
		this.view.nextQuestion();
		this.view.disabledBtn();
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
	disabledBtn() {
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
