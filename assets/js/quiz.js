// === start QUIZ
const DATA = [
	{
		question: "Вопрос 1",
		answers: [
			{
				id: "1",
				value: "Ответ 1",
				correct: true,
			},
			{
				id: "2",
				value: "Ответ 2",
				correct: false,
			},
			{
				id: "3",
				value: "Ответ 3",
				correct: false,
			},
		],
	},
	{
		question: "Вопрос 2",
		answers: [
			{
				id: "4",
				value: "Ответ 4",
				correct: false,
			},
			{
				id: "5",
				value: "Ответ 5",
				correct: true,
			},
		],
	},
	{
		question: "Вопрос 3",
		answers: [
			{
				id: "6",
				value: "Ответ 6",
				correct: false,
			},
			{
				id: "7",
				value: "Ответ 7",
				correct: true,
			},
			{
				id: "8",
				value: "Ответ 8",
				correct: false,
			},
			{
				id: "9",
				value: "Ответ 9",
				correct: false,
			},
		],
	},
];

let quizResult = {};

const quiz = document.getElementById("quiz");
const quizQuestions = document.getElementById("quizQuestions");
const quizIndicator = document.getElementById("quizIndicator");
const quizResults = document.getElementById("quizResults");
const quizRestart = document.getElementById("quizRestart");
const quizNext = document.getElementById("quizNext");

const renderQuestions = (index) => {
	renderIndicator(index + 1);

	quizQuestions.dataset.currentStep = index;

	const renderAnswers = () =>
		DATA[index].answers
			.map(
				(answer) => `
			<li>
				<div class="radio">
					<label>
						<input class="radio-real" type="radio" name="${index}" value=${answer.id} />
						<span class="radio-custom"></span>
						${answer.value}
					</label>
				</div>
			</li>
		`
			)
			.join("");

	quizQuestions.innerHTML = `
		<div class="quiz-questions__item">
			<div class="quiz-questions__item-ask">${DATA[index].question}</div>
			<ul class="quiz-questions__item-answer">${renderAnswers()}</ul>
		</div>
	`;
};

const renderResults = () => {
	let content = "";

	const getClassName = (answer, questionIndex) => {
		let classname = '';

		if (!answer.correct && answer.id === quizResult[questionIndex]) {
			classname = 'quiz--invalid';
		} else if (answer.correct) {
			classname = 'quiz--valid';
		}

		return classname;
	};

	const getAnswers = (questionIndex) => DATA[questionIndex].answers
		.map((answer) => `<li class="${getClassName(answer, questionIndex)}">${answer.value}</li>`)
		.join('');

	DATA.forEach((question, index) => {
		content += `
		<div class="quiz-results__item">
			<div class="quiz-results__item-ask">${question.question}</div>
			<ul class="quiz-results__item-answer">${getAnswers(index)}</ul>
		</div>
		`;
	});

	quizResults.innerHTML = content;
};

const renderIndicator = (currentStep) => {
	quizIndicator.innerHTML = `${currentStep} / ${DATA.length}`;
};

quiz.addEventListener("change", (event) => {
	if (event.target.classList.contains("radio-real")) {
		quizResult[event.target.name] = event.target.value;
		quizNext.disabled = false;
	}
});

quiz.addEventListener("click", (event) => {
	if (event.target.classList.contains("btn-next")) {
		const nextQuestionIndex = Number(quizQuestions.dataset.currentStep) + 1;

		if (DATA.length === nextQuestionIndex) {
			quizQuestions.classList.add('d-none');
			quizIndicator.classList.add('d-none');
			quizResults.classList.add('d-block');
			quizRestart.classList.add('d-iflex');
			quizNext.classList.add('d-none');

			renderResults();
		} else {
			renderQuestions(nextQuestionIndex);
		}

		quizNext.disabled = true;
	}

	if (event.target.classList.contains("btn-restart")) {
		quizResult = {};
		quizResults.innerHTML = '';

		quizQuestions.classList.remove('d-none');
		quizIndicator.classList.remove('d-none');
		quizResults.classList.remove('d-block');
		quizRestart.classList.remove('d-iflex');
		quizNext.classList.remove('d-none');

		renderQuestions(0);
	}
});

renderQuestions(0);
// === end QUIZ