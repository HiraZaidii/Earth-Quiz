/* below is js for game.html */
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
/*various questions with corresponding answers */
let questions = [{
        question: "When you go to the grocery shop, it’s best to..",
        choice1: '..buy a disposable bag at the counter to carry your groceries home',
        choice2: '..bring your own reusable bag for your groceries every time',
        answer: 2,
    },
    {
        question: "When you are out for a walk and get thirsty, it’s best to..",
        choice1: '..bring your own reusable water bottle with you so you can drink',
        choice2: '..buy a plastic water bottle from the store',
        answer: 1,
    },
    {
        question: "When you don’t play with your old toys, it’s best to..",
        choice1: '..to throw them away in the trash',
        choice2: '..to donate it to other children',
        answer: 2,
    },
    {
        question: "When you wash your hands, it’s best to..",
        choice1: '..to close the tap while soaping your hands',
        choice2: '..to keep the tap running while you soap your hands ',
        answer: 1,
    },
    {
        question: "When you are throwing away your paper, it’s best to..",
        choice1: '..throw it away separately in the paperbox',
        choice2: '..throw it any nearest trash bin',
        answer: 1,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

/* below is a function for the quiz, a spread operator that gets all the values from the questions*/
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
/* below will keep track of the score*/
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    };
    /* below will increament the progressbar as the questions increase */
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    /*calculate the value of the index of the questions */
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};
/* this part will increment score by 100 points for the correct answer and color the correct/incorrect answer */
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});
/* updates the score on the page */
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();