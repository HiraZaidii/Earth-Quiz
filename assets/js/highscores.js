/* below is the JS for the highscores.html page that shows the list of usernames and their scores */
const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");