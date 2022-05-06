const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const ProgressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progressBarfull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: 'When you go to the grocery shop, it’s best to:',
        choice1: '..buy a disposable bag at the counter to carry your groceries home',
        choice2: '..bring your own reusable bag for your groceries every time',
        answer: 2,
    },
    {
        question: 'When you are out for a walk and get thirsty, it’s best to:',
        choice1: '..bring your own reusable water bottle with you so you can drink',
        choice2: '..buy a plastic water bottle from the store',
        answer: 1,
    },
    {
        question: 'When you are throwing away your paper drawings, it’s best to:',
        choice1: '..throw it away separately in the paperbox',
        choice2: '..throw it any nearest trash bin',
        answer: 1,
    },
    {
        question: 'When you don’t play with your old toys, it’s best to:',
        choice1: '..to throw them away in the trash',
        choice2: '..to donate it to other children',
        answer: 2,
    },
    {
        question: 'When you wash your hands, it’s best to:',
        choice1: '..to close the tap while soaping your hands',
        choice2: '..to keep the tap running while you soap your hands ',
        answer: 1,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarfull.getElementsByClassName.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', d => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000);
    });
});

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()


/* below is the JS for the end.html page */
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = document.querySelector('#mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 4;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
});

saveHighScore = d => {
    d.preventdefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score

    })

    highScores.splice(4)
    localStorage.setItem('highScores', Json.stringify(highScores))
    window.location.assign('/')
}