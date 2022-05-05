const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const ProgressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progressBarfull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'What is the answer?',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
    },
    {
        question: 'What is the answer?',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
    },
    {
        question: 'What is the answer?',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
    },
    {
        question: 'What is the answer?',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
    },
    {
        question: 'What is the answer?',
        choice1: '',
        choice2: '',
        choice3: '',
        answer: 2,
    },
]