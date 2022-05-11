/* below is the JS for the end.html page */
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
/* will re-enable the save button */
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});
/* will allow us to click the button after a user name is inserted */
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score

    });

    highScores.splice(5);
    /* will save the highscores and show them on the leaderboard */
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('highscores.html');
};