// this calls HSFunction when the high scores page is loaded
window.onload = function HSFunction() {
    // takes high scores out of local storage, turns them back into an object and sets them to var high scores
    var highscores = JSON.parse(localStorage.getItem('highscores'))
    // sorts high scores list into highest to lowest scores
    highscores.sort(function(a, b) {
        return b.time - a.time;
    });
    console.log(highscores)
    // this for loop creates div classes and puts the scores and initials into the div classes
    for (let i = 0; i < highscores.length; i++) {
        var div = document.createElement('div')
        div.classList.add("HSlist")
        div.innerText = `${highscores[i].initals}  :  ${highscores[i].time}`
        document.querySelector('#highScoresList').appendChild(div)
        console.log(div);
    }
}